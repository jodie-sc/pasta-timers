export class PastaTimer {
    timerDisplay;
    timeDuration;
    playBtn;
    minusBtn;
    plusBtn;
    ringSound;
    frames;

    selectedPasta;
    timer;
    isRunning;
    timeLeft;
    currentFrame;

    constructor(selectedPasta) {
        location.href=this.selectedPasta;
        
        this.timerDisplay = document.getElementById("timer");
        this.timeDuration = Number(document.getElementById("minutes").textContent);
        this.playBtn = document.getElementById("play");
        this.minusBtn = document.getElementById("minus");
        this.plusBtn = document.getElementById("plus");
        this.ringSound = document.getElementById("ringSound");
        this.animation = document.getElementById("animImg");
        this.frames = ["../public/images/pasta-icon.png", "../public/images/pasta-icon-2.png"];

        this.selectedPasta=selectedPasta;
        this.isRunning = false;
        this.timeLeft = this.timeDuration * 60;        
        this.currentFrame = 0;
    }

    initTimer() {
        this.playBtn.addEventListener("click", this.selectTimer);
        this.minusBtn.addEventListener("click", this.removeTime);
        this.plusBtn.addEventListener("click", this.addTime);

        this.updateDisplay();
    }

    updateDisplay() {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;

        this.timerDisplay.textContent = minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
    }

    startTimer = () => {
        if (!this.isRunning) {
            this.isRunning = true;
            this.playBtn.textContent = "stop";
            this.timer = setInterval(() => {
                this.timeLeft--;
                this.updateDisplay();
                this.currentFrame = (this.currentFrame + 1) % this.frames.length;
                this.animation.src = this.frames[this.currentFrame];

                if (this.timeLeft <= 0) {
                    this.ringSound.currentTime = 0; // rewind to start
                    this.ringSound.play();
                    clearInterval(this.timer); // eq. break
                    this.isRunning = false;
                    this.timeLeft = this.timeDuration * 60;
                    this.updateDisplay();
                    this.playBtn.textContent = "start";
                }
            }, 1000);
        }
    }

    resetTimer = () => {
        clearInterval(this.timer);
        this.isRunning = false;
        this.timeLeft = this.timeDuration * 60;
        this.updateDisplay();
        this.playBtn.textContent = "start";
    }

    selectTimer = () => {
        if (this.isRunning) {
            this.resetTimer();
        } else {
            this.startTimer();
        }
    }
    
    removeTime = () => {
        this.timeLeft -= 30;
        if (this.timeLeft < 0) {
            this.timeLeft = 0;
        }
        this.updateDisplay();
    }

    addTime = () => {
        this.timeLeft += 30;
        this.updateDisplay();
    }
};