let colors = [
  "yellow",
  "blue",
  "red",
  "orange",
  "purple",
  "green",
  "white",
  "brown",
  "yellow",
  "blue",
  "red",
  "orange",
  "purple",
  "green",
  "white",
  "brown",
];

const movesCounterDiv = document.getElementById("movesCounter");
const matchedCounterDiv = document.getElementById("matchedCounter");

let movesCounter = 0;
let matchedCounter = 0;

function shuffleArray(array) {
  let currentIndex = array.length;

  while (currentIndex != 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
}

shuffleArray(colors);

const squares = document.getElementsByClassName("square");
console.log(colors);
console.log(squares);

for (let i = 0; i < squares.length; i++) {
  squares[i].addEventListener("click", function () {
    console.log(squares[i]);
    flipCard(squares, i);
    matchCheck(squares, i);
    movesCounter++;
    movesCounterDiv.innerHTML = movesCounter;
  });
}

function flipCard(squares, index) {
  squares[index].style.backgroundColor = colors[index];
}
let squaresColor = [];
let counter = 0;
let squaresArray = [];
function matchCheck(squares, index) {
  squaresColor.push(squares[index].style.backgroundColor);
  squaresArray.push(squares[index]);
  console.log(squaresColor);
  counter++;
  if (counter == 2) {
    if (squaresColor[0] == squaresColor[1]) {
      console.log("aynı");
      counter = 0;
      squaresColor = [];
      squaresArray = [];
      matchedCounter++;
      matchedCounterDiv.innerHTML = matchedCounter;
      if (matchedCounter == 8) {
        gameOver();
      }
    } else {
      for (let i = 0; i < squares.length; i++) {
        squares[i].style.pointerEvents = "none";
      }
      console.log("değil");
      counter = 0;
      squaresColor = [];
      console.log(squaresArray[0].style.backgroundColor);
      console.log(squaresArray[1].style.backgroundColor);
      setTimeout(() => {
        squaresArray[0].style.backgroundColor = "black";
        squaresArray[1].style.backgroundColor = "black";
        squaresArray = [];
        for (let i = 0; i < squares.length; i++) {
          squares[i].style.pointerEvents = "";
        }
      }, "1500");
    }
  }
}

function gameOver() {
  console.log("game over");
  const restartGameButton = document.createElement("button");
  restartGameButton.textContent = "Restart Game";

  restartGameButton.addEventListener("click", function () {
    location.reload();
  });

  const homePageButton = document.createElement("button");
  homePageButton.textContent = "Back Home Page";

  homePageButton.addEventListener("click", function () {
    window.location.href = "benchmark.html";
  });
  document.getElementById("game-over-screen").appendChild(restartGameButton);
  document.getElementById("game-over-screen").appendChild(homePageButton);
}
