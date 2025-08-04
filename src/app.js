import { PastaTimer } from "./PastaTimer/PastaTimer";
import { PastaAnimator } from "./PastaAnimator/PastaAnimator";

let PT= new PastaTimer();
PT.helloWorld();

let PA= new PastaAnimator();
PA.helloWorld();

const timerDisplay = document.getElementById("timer");
const timeDuration = Number(document.getElementById("minutes").textContent);
const playBtn = document.getElementById("play");
const minusBtn = document.getElementById("minus");
const plusBtn = document.getElementById("plus");
const ringSound = document.getElementById("ringSound");
const animation = document.getElementById("animImg");

let timer;
let isRunning = false;
let timeLeft = timeDuration * 60;
const frames = ["../public/images/pasta-icon.png", "../public/images/pasta-icon-2.png"];
let currentFrame = 0;

function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerDisplay.textContent = minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
}


function selectTimer() {
  if (isRunning) {
    resetTimer();
  } else {
    startTimer();
  }

}

function startTimer() {
  if (!isRunning) {
    isRunning = true;
    playBtn.textContent = "stop";
    timer = setInterval(() => {
      timeLeft--;
      updateDisplay();
      currentFrame = (currentFrame + 1) % frames.length;
      animation.src = frames[currentFrame];

      if (timeLeft <= 0) {
        ringSound.currentTime = 0; // rewind to start
        ringSound.play();
        clearInterval(timer); // eq. break
        isRunning = false;
        timeLeft = timeDuration * 60;
        updateDisplay();
        playBtn.textContent = "start";
      }
    }, 1000);
  }
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  timeLeft = timeDuration * 60;
  updateDisplay();
  playBtn.textContent = "start";
}

function removeTime() {
  timeLeft -= 30;
  if (timeLeft < 0) {
    timeLeft = 0;
  }
  updateDisplay();
}

function addTime() {
  timeLeft += 30;
  updateDisplay();
}

playBtn.addEventListener("click", selectTimer);
minusBtn.addEventListener("click", removeTime);
plusBtn.addEventListener("click", addTime);

updateDisplay();
