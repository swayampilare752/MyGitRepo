const icons = ['🍎', '🍌', '🍇', '🍉', '🍒', '🍋', '🥭', '🍍'];
let cards = [...icons, ...icons]; // Duplicate icons to form pairs
let flippedCards = [];
let matchedCards = [];
let attempts = 0;

const gameBoard = document.getElementById('game-board');
const attemptsDisplay = document.getElementById('attempts');

// Shuffle cards function
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
}

function createBoard() {
    gameBoard.innerHTML = "";
    shuffle(cards);
    cards.forEach((icon, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.icon = icon;
        card.dataset.index = index;
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

function flipCard() {
    if (flippedCards.length === 2) return; // Prevent flipping more than 2 at a time

    this.classList.add('flipped');
    this.textContent = this.dataset.icon;
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        attempts++;
        attemptsDisplay.textContent = attempts;
        checkMatch();
    }
}

function checkMatch() {
    let [card1, card2] = flippedCards;

    if (card1.dataset.icon === card2.dataset.icon) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedCards.push(card1, card2);
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.textContent = '';
            card2.textContent = '';
        }, 1000);
    }

    flippedCards = [];

    // Check if game is over
    if (matchedCards.length === cards.length) {
        setTimeout(() => alert(`Game Over! Attempts: ${attempts}`), 500);
    }
}

function restartGame() {
    attempts = 0;
    attemptsDisplay.textContent = attempts;
    flippedCards = [];
    matchedCards = [];
    createBoard();
}

// Start the game
createBoard();
