  const contactForm = document.getElementById("contactForm");

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Get form values
    const name = document.getElementById("nameInput").value.trim();
    const email = document.getElementById("emailInput").value.trim();
    const eventCategory = document.getElementById("eventCategorySelect").value;
    const comments = document.getElementById("commentsInput").value.trim();

    try {
      // Save data to Firestore collection 'registrations'
      await db.collection("registrations").add({
        name,
        email,
        eventCategory,
        comments,
        submittedAt: firebase.firestore.FieldValue.serverTimestamp()
      });

      alert("Registration successful! Thank you.");
      contactForm.reset(); // clear form after submission
    } catch (error) {
      console.error("Error saving registration: ", error);
      alert("Sorry, something went wrong. Please try again.");
    }
  });