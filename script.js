let timer;
let rest = 5;
let isRunning = false;
let isWorkSession = true;

const timerDisplay = document.getElementById("timer");
const work = Number(document.getElementById("minutes").textContent);
const statusDisplay = document.getElementById("status");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");
const ringSound = document.getElementById('ringSound');
const clickSound = document.getElementById('clickSound');
const title = document.getElementsByTagName('title');

let timeLeft = work * 60;

function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerDisplay.textContent = minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
}

function startTimer() {
  if (!isRunning) {
    clickSound.play();
    isRunning = true;
    timer = setInterval(() => {
      timeLeft--;
      updateDisplay();

      if (timeLeft <= 0) {
        ringSound.currentTime = 0; // rewind to start
        ringSound.play();
        clearInterval(timer); // eq. break
        isRunning = false;
        isWorkSession = !isWorkSession;
        timeLeft = isWorkSession ? work * 60 : rest * 60;
        statusDisplay.textContent = isWorkSession ? "Work Session" : "Break Time";
        startTimer();
      }
    }, 1000);
  }
}

function pauseTimer() {
  clickSound.play();
  clearInterval(timer);
  isRunning = false;
}

function resetTimer() {
  clickSound.play();
  clearInterval(timer);
  isRunning = false;
  timeLeft = work * 60;
  isWorkSession = true;
  statusDisplay.textContent = "Work Session";
  updateDisplay();
}

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

updateDisplay();
