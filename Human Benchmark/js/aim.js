const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
gameScreen.style.display = "none";

const target = document.getElementById("target");

const remainingLabel = document.getElementById("remaining");

const gameEndScreen = document.getElementById("game-end-screen");

gameEndScreen.style.display = "none";

const avgMsLabel = document.getElementById("average-ms");

const tryAgainButton = document.getElementById("try-again");

const backHomeButton = document.getElementById("back-home");

let remaining = 10;

let firstClickTime = null;

let timeDifferenceArray = [];

const startButton = document.getElementById("game-start-button");
startButton.addEventListener("click", function () {
  startScreen.style.display = "none";
  gameScreen.style.display = "";
  remainingLabel.innerHTML = `Remaining: ${remaining}`;
  clickTarget();
});

target.addEventListener("click", clickTarget);

function clickTarget() {
  if (firstClickTime === null) {
    firstClickTime = new Date().getTime();
  } else {
    let currentTime = new Date().getTime();
    let timeDifference = currentTime - firstClickTime;
    console.log("Time Difference:", timeDifference, "ms");
    firstClickTime = currentTime;
  }

  let top = generateRandomNumber(20, 90);
  let left = generateRandomNumber(10, 90);
  positionTarget(top, left);
  remainingLabel.innerHTML = `Remaining: ${remaining}`;

  if (remaining == 0) {
    let avg = calculateAverageTimeDifference();
    avgMsLabel.innerHTML = `${avg} ms`;
    gameEndScreen.style.display = "";
    gameScreen.style.display = "none";
  }
  remaining--;
}

function positionTarget(top, left) {
  target.style.position = "absolute";
  target.style.top = `${top}%`;
  target.style.left = `${left}%`;
  target.style.transform = "translate(-50%, -50%)";
}

function generateRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function calculateAverageTimeDifference() {
  let total = 0;
  for (let i = 0; i < timeDifferenceArray.length; i++) {
    total += timeDifferenceArray[i];
  }
  let avg = total / timeDifferenceArray.length;
  return avg;
}

tryAgainButton.addEventListener("click", function () {
  window.location.href = "aim.html";
});

backHomeButton.addEventListener("click", function () {
  window.location.href = "benchmark.html";
});
