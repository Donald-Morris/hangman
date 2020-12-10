const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const figureParts = document.querySelectorAll('.figure-part');
const words = [
  'application',
  'programming',
  'interface',
  'wizard',
  'console',
  'development',
  'software',
  'algorithm',
];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

//show the hidden word
function displayWord() {
  wordEl.innerHTML = `${selectedWord
    // convert selected word string into an array via split
    .split('')
    //map through the array to see if letter is included in word
    .map(
      letter =>
        `<span class="letter">
        ${correctLetters.includes(letter) ? letter : ''}
        </span>`
    )
    //convert array back into string
    .join('')}`;
  //replaces the new line character at the end of each letter with an empty string
  const innerWord = wordEl.innerText.replace(/\n/g, '');

  //display popup
  if (innerWord === selectedWord) {
    finalMessage.innerText = 'Congrats, you win! :)';
    popup.style.display = 'flex';
  }
}

//update the wrong letters
function updateWrongLettersEl() {
  //display wrong letters
  wrongLettersEl.innerHTML = `
  ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
  ${wrongLetters.map(letter => `<span>${letter}</span>`)}
  `;

  //display figure parts
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;

    if (index < errors) {
      part.style.display = 'block';
    } else {
      part.style.display = 'none';
    }
  });
  //check if lost
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = 'Sorry, you lost :(';
    popup.style.display = 'flex';
  }
}

//show notification
function showNotification() {
  notification.classList.add('show');
  setTimeout(() => {
    notification.classList.remove('show');
  }, 2000);
}

//keydown letter press
window.addEventListener('keydown', e => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;

    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);

        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        updateWrongLettersEl();
      } else {
        showNotification();
      }
    }
  }
});

//restart game and play again
playAgainBtn.addEventListener('click', () => {
  //empty arrays
  correctLetters.splice(0);
  wrongLetters.splice(0);
  //select another new word
  selectedWord = words[Math.floor(Math.random() * words.length)];
  displayWord();
  updateWrongLettersEl();
  popup.style.display = 'none';
});

displayWord();
