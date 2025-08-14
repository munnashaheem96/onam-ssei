function OnamCountdownTracker(label, value){
  var el = document.createElement('span');
  el.className = 'onam-flip-clock__piece';
  el.innerHTML =
    '<b class="onam-flip-clock__card onam-card">'+
      '<b class="onam-card__top"></b>'+
      '<b class="onam-card__bottom"></b>'+
      '<b class="onam-card__back"><b class="onam-card__bottom"></b></b>'+
    '</b>'+
    '<span class="onam-flip-clock__slot">' + label + '</span>';
  this.el = el;

  var top = el.querySelector('.onam-card__top'),
      bottom = el.querySelector('.onam-card__bottom'),
      back = el.querySelector('.onam-card__back'),
      backBottom = el.querySelector('.onam-card__back .onam-card__bottom');

  this.update = function(val){
    val = ('0' + val).slice(-2);
    if (val !== this.currentValue) {
      if (this.currentValue >= 0) {
        back.setAttribute('data-value', this.currentValue);
        bottom.setAttribute('data-value', this.currentValue);
      }
      this.currentValue = val;
      top.innerText = this.currentValue;
      backBottom.setAttribute('data-value', this.currentValue);
      this.el.classList.remove('onam-flip');
      void this.el.offsetWidth;
      this.el.classList.add('onam-flip');
    }
  }
  this.update(value);
}

function getOnamTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  return {
    'Total': t,
    'Days': Math.floor(t / (1000 * 60 * 60 * 24)),
    'Hours': Math.floor((t / (1000 * 60 * 60)) % 24),
    'Minutes': Math.floor((t / 1000 / 60) % 60),
    'Seconds': Math.floor((t / 1000) % 60)
  };
}

function OnamClock(countdown,callback) {
  countdown = countdown ? new Date(Date.parse(countdown)) : false;
  callback = callback || function(){};
  var updateFn = countdown ? getOnamTimeRemaining : getTime;
  this.el = document.createElement('div');
  this.el.className = 'onam-flip-clock';
  var trackers = {},
      t = updateFn(countdown),
      key, timeinterval;
  for (key in t){
    if (key === 'Total') continue;
    trackers[key] = new OnamCountdownTracker(key, t[key]);
    this.el.appendChild(trackers[key].el);
  }
  var i = 0;
  function updateClock() {
    timeinterval = requestAnimationFrame(updateClock);
    if (i++ % 10) return;
    var t = updateFn(countdown);
    if (t.Total < 0) {
      cancelAnimationFrame(timeinterval);
      for (key in trackers) trackers[key].update(0);
      callback();
      return;
    }
    for (key in trackers) trackers[key].update(t[key]);
  }
  setTimeout(updateClock,500);
}

document.addEventListener("DOMContentLoaded", function() {
  var deadline = new Date("Sep 01, 2025 08:00:00");
  var c = new OnamClock(deadline, function(){
    alert("Countdown complete!");
  });
  document.getElementById("onam-flip-clock-container").appendChild(c.el);
});
