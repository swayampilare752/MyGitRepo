// DOM elements
const ratings = document.querySelectorAll(".rating");
const btn = document.getElementById("btn");
const container = document.getElementById("container");

// Selected rating
let selectedRating = "";

// Add click event to each rating
ratings.forEach((rating) => {
  rating.addEventListener("click", () => {
    removeActiveClasses();
    rating.classList.add("active");
    selectedRating = rating.querySelector("small").innerText;
  });
});

// On button click, show the confirmation message
btn.addEventListener("click", () => {
  if (selectedRating) {
    container.innerHTML = `
      <div class="confirmation">
        <h2>Thank You!</h2>
        <p>Your feedback: <strong>${selectedRating}</strong></p>
        <p>We value your opinion and will use it to improve!</p>
      </div>
    `;
  } else {
    alert("Please select feedback before submitting!");
  }
});

// Function to remove active classes
function removeActiveClasses() {
  ratings.forEach((rating) => {
    rating.classList.remove("active");
  });
}
