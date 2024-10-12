const containerButton = document.getElementById("container-button");

const contentDiv = document.getElementById("content-div");

const gameDiv = document.getElementById("game-div");

const reactionDiv = document.getElementById("reaction");

const msDiv = document.getElementById("ms");

const message = document.getElementById("message");

const buttonContainerDiv = document.getElementById("button-container");

const passingTimeArray = [];

let clickTime;
let msTimeout;

let counter = 0;
let isNotClickable = true;
containerButton.addEventListener("click", clickHandler);

function clickHandler() {
  if (isNotClickable) {
    containerButton.removeEventListener("click", clickHandler);
  }

  if (counter == 10) {
    console.log(passingTimeArray);
    let avg = calculateAvgPassingTime(passingTimeArray);
    message.innerHTML = "Average Value";
    msDiv.innerHTML = `${avg} ms`;
    let restartButton = addRestartButton();
    let backHomeButton = addBackHomePageButton();
    containerButton.removeEventListener("click", clickHandler);
    restartButton.addEventListener("click", restartPage);
    backHomeButton.addEventListener("click", backHomePage);
  } else {
    clickTime = handleClick();
    console.log("counter:" + counter);
    if (counter % 2 == 0) {
      beforeGame();
      firstClick();
    } else if (counter % 2 == 1) {
      secondClick();
      clickTime = 0;
      msTimeout = 0;
      gameDiv.style.backgroundColor = "red";
    }

    counter++;

    if (counter == 10) {
      message.innerHTML = "Click to see the average value";
    }
  }
}

function addRestartButton() {
  const button = document.createElement("button");
  button.textContent = "Restart Test";
  button.classList.add("restart-button");
  buttonContainerDiv.appendChild(button);
  return button;
}

function addBackHomePageButton() {
  const button = document.createElement("button");
  button.textContent = "Back Home Page";
  button.classList.add("home-page-button");
  buttonContainerDiv.appendChild(button);
  return button;
}

function restartPage() {
  window.location.reload();
}

function backHomePage() {
  window.location.href = "benchmark.html";
}

function calculateAvgPassingTime(arr) {
  let total = 0;
  let avg = 0;
  for (let i = 0; i < arr.length; i++) {
    total += arr[i];
  }
  avg = total / arr.length;
  return avg;
}

let isExecuted = false;

function beforeGame() {
  gameDiv.style.display = "none";
  reactionDiv.style.display = "none";
}

beforeGame();

function firstClick() {
  contentDiv.style.display = "none";
  gameDiv.style.display = "";
  let timeout = generateRandomSeconds();
  msTimeout = timeout * 1000;
  changeScreen(timeout);
  isNotClickable = false;
  console.log(msTimeout);
}

function secondClick() {
  let passingTime = clickTime - msTimeout;
  passingTimeArray.push(passingTime);
  console.log("geçen süre:" + passingTime);
  reactionDiv.style.display = "";
  msDiv.innerHTML = `${passingTime} ms`;
  gameDiv.style.display = "none";
  isNotClickable = true;
}

function changeScreen(timeout) {
  setTimeout(() => {
    gameDiv.style.backgroundColor = "green";
    containerButton.addEventListener("click", clickHandler);
  }, timeout * 1000);
}

function generateRandomSeconds() {
  let min = 4;
  let max = 7;
  let diff = max - min;
  let randomDecimal = (Math.random() * diff + min).toFixed(2);
  return randomDecimal;
}

let firstClickTime = null;

function handleClick() {
  if (firstClickTime === null) {
    firstClickTime = new Date();
    console.log("İlk tıklama zamanı: " + firstClickTime);
  } else {
    let secondClickTime = new Date();
    console.log("İkinci tıklama zamanı: " + secondClickTime);

    let timeDifference = secondClickTime - firstClickTime;
    console.log("Geçen süre (milisaniye): " + timeDifference);

    let secondsDifference = timeDifference / 1000;
    console.log("Geçen süre (saniye): " + secondsDifference.toFixed(2));

    firstClickTime = null;

    return timeDifference;
  }
}
