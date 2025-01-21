// Capture DOM elements
const keyName = document.getElementById("key-name");
const keyCode = document.getElementById("key-code");
const keyHistory = document.getElementById("key-history");

// Array to store keypress history
const history = [];

// Add sound effect
const keySound = new Audio('https://www.soundjay.com/button/sounds/button-10.mp3');

// Event listener for key press
document.addEventListener("keydown", (event) => {
  const { key, code, ctrlKey, shiftKey, altKey } = event;

  // Construct the key combination (e.g., Ctrl + C)
  let keyCombination = "";
  if (ctrlKey) keyCombination += "Ctrl + ";
  if (shiftKey) keyCombination += "Shift + ";
  if (altKey) keyCombination += "Alt + ";
  keyCombination += key;

  // Update the UI
  keyName.textContent = keyCombination;
  keyCode.textContent = code;

  // Play sound
  keySound.currentTime = 0;
  keySound.play();

  // Add to history
  history.push({ keyCombination, code });
  updateHistory();
});

// Function to update the keypress history
function updateHistory() {
  keyHistory.innerHTML = ""; // Clear the history UI

  history.slice(-10).forEach((item) => { // Limit to the last 10 keys
    const li = document.createElement("li");
    li.textContent = `${item.keyCombination} - ${item.code}`;
    keyHistory.appendChild(li);
  });
}
