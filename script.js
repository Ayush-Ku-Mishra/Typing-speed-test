const typingText = document.getElementById('text-display');
const inputField = document.getElementById('user-input');
const timerEl = document.getElementById('timer');
const wpmEl = document.getElementById('wpm');
const cpmEl = document.getElementById('cpm');
const accuracyEl = document.getElementById('accuracy');

let characterIndex = 0;
let errors = 0;
let correctChars = 0;
let timer;
let maxTime = 60;
let timeLeft = maxTime;
let isTyping = false;
let paragraphChars = [];

// Load a random paragraph from your local paragraphs array
function loadParagraph() {
  const randomIndex = Math.floor(Math.random() * paragraphs.length);
  const text = paragraphs[randomIndex];
  typingText.innerHTML = '';

  text.split('').forEach(char => {
    const span = document.createElement('span');
    span.textContent = char;
    typingText.appendChild(span);
  });

  paragraphChars = typingText.querySelectorAll('span');
  paragraphChars[0].classList.add('active');
}

// Start timer
function startTimer() {
  timer = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      timerEl.textContent = timeLeft;
    } else {
      clearInterval(timer);
      inputField.disabled = true;
      inputField.blur();
    }
  }, 1000);
}

// Handle typing input
function handleInput() {
  if (!isTyping) {
    startTimer();
    isTyping = true;
  }

  const typedChar = inputField.value.split('')[characterIndex];

  if (characterIndex < paragraphChars.length && timeLeft > 0) {
    if (typedChar == null) {
      // Backspace
      if (characterIndex > 0) {
        characterIndex--;
        if (paragraphChars[characterIndex].classList.contains('incorrect')) {
          errors--;
        }
        if (paragraphChars[characterIndex].classList.contains('correct')) {
          correctChars--;
        }
        paragraphChars[characterIndex].classList.remove('correct', 'incorrect');
      }
    } else {
      if (paragraphChars[characterIndex].textContent === typedChar) {
        paragraphChars[characterIndex].classList.add('correct');
        correctChars++;
      } else {
        paragraphChars[characterIndex].classList.add('incorrect');
        errors++;
      }
      characterIndex++;
    }

    paragraphChars.forEach(span => span.classList.remove('active'));
    if (characterIndex < paragraphChars.length) {
      paragraphChars[characterIndex].classList.add('active');
    }

    // Update stats
    cpmEl.textContent = correctChars;
    const wpm = Math.round(((correctChars / 5) / (maxTime - timeLeft)) * 60);
    wpmEl.textContent = wpm > 0 && wpm !== Infinity ? wpm : 0;
    const accuracy = Math.round((correctChars / (correctChars + errors)) * 100) || 0;
    accuracyEl.textContent = accuracy;
  }
}

// Reset the test
function resetTest() {
  clearInterval(timer);
  loadParagraph();
  inputField.value = '';
  inputField.disabled = false;
  timerEl.textContent = maxTime;
  wpmEl.textContent = 0;
  cpmEl.textContent = 0;
  accuracyEl.textContent = 0;
  characterIndex = 0;
  errors = 0;
  correctChars = 0;
  timeLeft = maxTime;
  isTyping = false;
}

inputField.addEventListener('input', handleInput);

// Focus input on click or keydown
document.addEventListener('keydown', () => inputField.focus());
typingText.addEventListener('click', () => inputField.focus());

// Load initial paragraph
loadParagraph();

const resetBtn = document.getElementById('reset');
resetBtn.addEventListener('click', resetTest);

const video = document.getElementById('splashVideo');
const splash = document.getElementById('splash');
const main = document.getElementById('mainContent');

video.addEventListener('ended', () => {
  splash.style.display = 'none';
  main.style.display = 'block';
});

setTimeout(() => {
  splash.style.display = 'none';
  main.style.display = 'block';
}, 3000); // hide splash after 2 seconds