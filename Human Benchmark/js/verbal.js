const wordsArray = [
  "time",
  "year",
  "people",
  "way",
  "day",
  "man",
  "thing",
  "woman",
  "life",
  "child",
  "world",
  "school",
  "state",
  "family",
  "student",
  "group",
  "country",
  "problem",
  "hand",
  "part",
  "place",
  "case",
  "week",
  "company",
  "system",
  "program",
  "question",
  "work",
  "government",
  "number",
  "night",
  "point",
  "home",
  "water",
  "room",
  "mother",
  "area",
  "money",
  "story",
  "fact",
  "month",
  "lot",
  "right",
  "study",
  "book",
  "eye",
  "job",
  "word",
  "business",
  "issue",
  "side",
  "kind",
  "head",
  "house",
  "service",
  "friend",
  "father",
  "power",
  "hour",
  "game",
  "line",
  "end",
  "member",
  "law",
  "car",
  "city",
  "community",
  "name",
  "president",
  "team",
  "minute",
  "idea",
  "kid",
  "body",
  "information",
  "back",
  "parent",
  "face",
  "others",
  "level",
  "office",
  "door",
  "health",
  "person",
  "art",
  "war",
  "history",
  "party",
  "result",
  "change",
  "morning",
  "reason",
  "research",
  "girl",
  "guy",
  "moment",
  "air",
  "teacher",
  "force",
  "education",
];

const startScreenDiv = document.getElementById("start-screen");
const gameScreenDiv = document.getElementById("game-screen");
gameScreenDiv.style.display = "none";

const livesLabel = document.getElementById("lives");
const scoreLabel = document.getElementById("score");
const wordLabel = document.getElementById("word");

const newButton = document.getElementById("new-button");
const seenButton = document.getElementById("seen-button");

const gameEndScreen = document.getElementById("game-end-screen");
gameEndScreen.style.display = "none";

newButton.addEventListener("click", handleNewButton);
seenButton.addEventListener("click", handleSeenButton);

const wordLabelGameEnd = document.getElementById("word-label");

const tryAgainButton = document.getElementById("try-again-button");
tryAgainButton.addEventListener("click", function () {
  window.location.href = "verbal.html";
});

const backHomeButton = document.getElementById("back-page-button");
backHomeButton.addEventListener("click", function () {
  window.location.href = "benchmark.html";
});

const newArray = [...wordsArray];
const seenArray = [];

let lives = 3;
let score = 0;

let randomNumber;
let word;
let choose;

let chooseArray = [1, 1, 1, 1, 1, 1, 1, 1, 0, 0];

livesLabel.innerText = `Lives | ${lives}`;
scoreLabel.innerText = `Score | ${score}`;

const gameStartButton = document.getElementById("game-start-button");
gameStartButton.addEventListener("click", function () {
  startScreenDiv.style.display = "none";
  gameScreenDiv.style.display = "";
  randomNumber = getRandomInteger(0, newArray.length);
  word = getWord(newArray, randomNumber);
  deleteWord(newArray, randomNumber);
  wordLabel.innerText = word;
  console.log(word);
});

function getRandomInteger(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getWord(array, index) {
  return array[index];
}

function deleteWord(array, index) {
  array.splice(index, 1);
}

function moveWordSeenArray(word) {
  seenArray.push(word);
}

function gameLogic() {
  choose = getRandomInteger(0, 9);
  let choosed = chooseArray[choose];
  console.log(choosed);
  moveWordSeenArray(word);

  if (choosed == 1) {
    randomNumber = getRandomInteger(0, newArray.length - 1);
    word = getWord(newArray, randomNumber);
    deleteWord(newArray, randomNumber);
  } else {
    randomNumber = getRandomInteger(0, seenArray.length - 1);
    console.log(randomNumber);
    word = getWord(seenArray, randomNumber);
  }
  console.log(word);
  wordLabel.innerText = word;
}

function handleNewButton() {
  if (!seenArray.includes(word)) {
    score++;
    scoreLabel.innerText = `Score | ${score}`;
    gameLogic();
  } else {
    lives--;
    if (lives == 0) {
      console.log("game over");
      gameEndScreen.style.display = "";
      gameScreenDiv.style.display = "none";
      wordLabelGameEnd.innerText = `${score} words`;
    } else {
      livesLabel.innerText = `Lives | ${lives}`;
      gameLogic();
    }
  }
}

function handleSeenButton() {
  if (seenArray.includes(word)) {
    score++;
    scoreLabel.innerText = `Score | ${score}`;
    gameLogic();
  } else {
    lives--;
    if (lives == 0) {
      console.log("game over");
      gameEndScreen.style.display = "";
      gameScreenDiv.style.display = "none";
      wordLabelGameEnd.innerText = `${score} words`;
    } else {
      livesLabel.innerText = `Lives | ${lives}`;
      gameLogic();
    }
  }
}
