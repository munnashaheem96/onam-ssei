const scheduleData = [
  { time: "6:30 AM", event: "Gathering of Malayali students for campus decoration and Athapookkalam setup (Centre of A Block)" },
  { time: "8:30 AM", event: "General student assembly at A Block" },
  { time: "8:35 AM", event: "Grand Entry of Maveli through the main gate with Chendamelam" },
  { time: "8:40 AM", event: "Welcome Speech - Sandra Krishna (Nsg 1st)" },
  { time: "8:45 AM", event: "Official Inauguration of the celebration (ED Sir and Chairman Sir)" },
  { time: "9:15 AM", event: "Talk About Onam - Sreya Chandran" },
  { time: "9:40 AM", event: "Mega Thiruvathira – Centre of A Block" },
  { time: "10:15 AM", event: "Athapookkalam Contest Begins – Venue: Pharmacy Seminar Hall Time Limit: Till 12:00 PM" },
  { time: "10:15 AM", event: "Cultural Performances by Students on STAGE" },
  { time: "11:15 AM", event: "Distribution of Onappayasam – 4 Food Stalls" },
  { time: "11:30 AM", event: "Fun Games Begin: Sundarikkuttu Pothuthal - Chakkilottam (Ground)" },
  { time: "11:45 AM", event: "Uriyadi Competition – Ground" },
  { time: "12:00 PM", event: "Tug of War – Ground" },
  { time: "12:30 PM", event: "Prize Distribution" },
  { time: "12:45 PM", event: "Vote of Thanks - Aishwarya Mam" },
  { time: "1:00 PM", event: "Kalaashakottu Procession with Chendamelam and Maveli – Ground" },
  { time: "2:00 PM", event: "Onam Sadhya for Faculties" }
];

const container = document.getElementById("scheduleDatas");
let activeIndex = 0;

function renderCards() {
  container.innerHTML = "";
  scheduleData.forEach((item, i) => {
    const card = document.createElement("div");
    card.classList.add("schedule-card");
    if (i === activeIndex) card.classList.add("active");

    card.innerHTML = `
      <div id="backgroundCut">
        <img src="/assets/images/backgrounds/customer-satisfaction-bg.svg" alt="">
      </div>
      <div>
        <h2>${item.time}</h2>
        <p>${item.event}</p>
      </div>
    `;

    card.addEventListener("click", () => {
      setActiveCard(i);
    });

    container.appendChild(card);
  });
  scrollToActive();
}

function setActiveCard(i) {
  activeIndex = i;
  renderCards();
}

function scrollToActive() {
  const activeCard = container.children[activeIndex];
  if (!activeCard) return;

  const containerRect = container.getBoundingClientRect();
  const cardRect = activeCard.getBoundingClientRect();
  const scrollLeft = container.scrollLeft;

  // Calculate offset so active card is centered
  const offset = cardRect.left - containerRect.left - (containerRect.width / 2) + (cardRect.width / 2);
  container.scrollTo({ left: scrollLeft + offset, behavior: "smooth" });
}

// Auto slide every 4 seconds
setInterval(() => {
  activeIndex = (activeIndex + 1) % scheduleData.length;
  renderCards();
}, 4000);

renderCards();
