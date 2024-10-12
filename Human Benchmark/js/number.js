const startButton = document.getElementById("start-button");
const gameScreenDiv = document.getElementById("game-screen");
gameScreenDiv.style.display = "none";
const startScreenDiv = document.getElementById("start-screen");

const randomNumberLabel = document.getElementById("random-number");

const answerScreenDiv = document.getElementById("answer-screen");
answerScreenDiv.style.display = "none";

const gameEndScreenDiv = document.getElementById("game-end-screen");
gameEndScreenDiv.style.display = "none";

const numberLabel = document.getElementById("number");
const yourNumberLabel = document.getElementById("your-number");
const levelLabel = document.getElementById("level");

const inputNumber = document.getElementById("input-number");

const submitButton = document.getElementById("submit-button");

const tryAgainButton = document.getElementById("try-again-button");
const backHomePageButton = document.getElementById("back-home-button");

tryAgainButton.addEventListener("click", function () {
  window.location.href = "number.html";
});

backHomePageButton.addEventListener("click", function () {
  window.location.href = "benchmark.html";
});

let level = 1;

let randomInteger;

submitButton.addEventListener("click", function () {
  let checkInput = checkInputValue(inputNumber.value, randomInteger);
  console.log(randomInteger);
  console.log(inputNumber.value);
  console.log(checkInput);
  if (checkInput) {
    level++;
    game();
  } else {
    console.log("wrong number");
    gameEndScreenDiv.style.display = "";
    answerScreenDiv.style.display = "none";
    numberLabel.textContent = randomInteger;
    yourNumberLabel.textContent = inputNumber.value;
    levelLabel.textContent = `Level ${level}`;
  }
});

startButton.addEventListener("click", function () {
  gameScreenDiv.style.display = "";
  startScreenDiv.style.display = "none";
  game();
});

function randomIntegerWithDigits(digits) {
  if (digits <= 0) {
    return 0;
  }
  const min = Math.pow(10, digits - 1);
  const max = Math.pow(10, digits) - 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function game() {
  gameScreenDiv.style.display = "";
  answerScreenDiv.style.display = "none";
  inputNumber.value = "";
  randomInteger = randomIntegerWithDigits(level);
  randomNumberLabel.innerText = randomInteger;
  loadingBar();
}

function loadingBar() {
  let isTimeOver = false;
  let loadingBar = document.getElementById("loading-bar");
  let animationDuration = 3000;
  let progress = 0;
  loadingBar.style.animationDuration = animationDuration / 1000 + "s";

  let interval = setInterval(function () {
    if (progress >= 100) {
      clearInterval(interval);
      console.log("Yükleme tamamlandı!");
      answerScreenDiv.style.display = "";
      gameScreenDiv.style.display = "none";
    } else {
      progress += 1;
      loadingBar.style.width = progress + "%";
    }
  }, animationDuration / 100);
}

function checkInputValue(input, randomNumber) {
  if (input == randomNumber) {
    return true;
  }
  return false;
}
