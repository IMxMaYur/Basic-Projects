const fruits = ["apple", "banana", "orange", "grape", "mango"];

let selectedWord;
let guessedLetters = [];
let remainingAttempts;

function getRandomFruit() {
    return fruits[Math.floor(Math.random() * fruits.length)];
}

function displayWord() {
    let wordDisplay = '';
    for (let letter of selectedWord) {
        if (guessedLetters.includes(letter)) {
            wordDisplay += letter + ' ';
        } else {
            wordDisplay += '_ ';
        }
    }
    document.getElementById('word').textContent = wordDisplay.trim();
}

function displayHangman() {
    document.getElementById('hangman').textContent = 'Attempts Remaining: ' + remainingAttempts;
}

function displayLetters() {
    const lettersContainer = document.getElementById('letters');
    lettersContainer.innerHTML = '';
    for (let i = 65; i <= 90; i++) {
        const letter = String.fromCharCode(i);
        const button = document.createElement('button');
        button.textContent = letter;
        button.onclick = function() {
            guessLetter(letter.toLowerCase());
        };
        if (guessedLetters.includes(letter.toLowerCase())) {
            button.disabled = true;
        }
        lettersContainer.appendChild(button);
    }
}

function guessLetter(letter) {
    if (!guessedLetters.includes(letter)) {
        guessedLetters.push(letter);
        if (!selectedWord.includes(letter)) {
            remainingAttempts--;
        }
        displayWord();
        displayHangman();
        checkGameStatus();
    }
}

function giveHint() {
    const remainingLetters = [];
    for (let i = 97; i <= 122; i++) {
        const letter = String.fromCharCode(i);
        if (!guessedLetters.includes(letter)) {
            remainingLetters.push(letter);
        }
    }
    const randomIndex = Math.floor(Math.random() * remainingLetters.length);
    guessLetter(remainingLetters[randomIndex]);
}


function checkGameStatus() {
    document.getElementById('score').textContent = 'Score: ' + score;
    const wordDisplay = document.getElementById('word').textContent;
    if (remainingAttempts === 0) {
        document.getElementById('result').textContent = 'You lose! The word was: ' + selectedWord;
    } else if (!wordDisplay.includes('_')) {
        score += 10; // Increment the score by 10 for each correct guess
        document.getElementById('score').textContent = 'Score: ' + score;
        document.getElementById('result').textContent = 'Congratulations! You win!';
    }
}

function startGame() {
    selectedWord = getRandomFruit();
    guessedLetters = [];
    remainingAttempts = 6;
    displayWord();
    displayHangman();
    displayLetters();
    document.getElementById('result').textContent = '';
}

startGame();