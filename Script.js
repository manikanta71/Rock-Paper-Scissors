let userScore = 0;
let compScore = 0;
const Target = 10;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScorePara = document.querySelector("#userScore");
const compScorePara = document.querySelector("#compScore");
const restartBtn = document.querySelector("#restart");

const genCompChoice = () => {
  const options = ["rock", "paper", "scissors"];
  const randIdx = Math.floor(Math.random() * 3);
  return options[randIdx];
};

const drawGame = () => {
  msg.innerText = "It's a Draw! Try again.";
  msg.style.backgroundColor = "#ffc107";
};

const showWinner = (userWin, userChoice, compChoice) => {
  if (userWin) {
    userScore++;
    userScorePara.innerText = userScore;
    msg.innerText = `You Win! 🎉 ${userChoice} beats ${compChoice}`;
    msg.style.backgroundColor = "green";
  } else {
    compScore++;
    compScorePara.innerText = compScore;
    msg.innerText = `You Lost. 😞 ${compChoice} beats ${userChoice}`;
    msg.style.backgroundColor = "red";
  }
};

const checkEndGame = () => {
  if (userScore === Target || compScore === Target) {
    if (userScore > compScore) {
      msg.innerText = `Game Over! You are the Winner! 🎉`;
    } else {
      msg.innerText = `Game Over! Computer Wins! 😞`;
    }
    msg.style.backgroundColor = "purple";
    choices.forEach(choice => choice.removeEventListener("click", handleClick));
    restartBtn.style.display = "block"; // Show Restart Button
  }
};

const playGame = (userChoice) => {
  if (userScore === Target || compScore === Target) {
    checkEndGame();
    return;
  }

  const compChoice = genCompChoice();

  if (userChoice === compChoice) {
    drawGame();
  } else {
    let userWin = true;
    if (userChoice === "rock") {
      userWin = compChoice === "paper" ? false : true;
    } else if (userChoice === "paper") {
      userWin = compChoice === "scissors" ? false : true;
    } else {
      userWin = compChoice === "rock" ? false : true;
    }
    showWinner(userWin, userChoice, compChoice);
    checkEndGame();
  }
};

const handleClick = (event) => {
  const userChoice = event.target.getAttribute("id");
  playGame(userChoice);
};

const restartGame = () => {
  userScore = 0;
  compScore = 0;
  userScorePara.innerText = userScore;
  compScorePara.innerText = compScore;
  msg.innerText = "Make your choice:";
  msg.style.backgroundColor = "#081b31";
  choices.forEach(choice => choice.addEventListener("click", handleClick));
  restartBtn.style.display = "none";
};

choices.forEach(choice => choice.addEventListener("click", handleClick));
restartBtn.addEventListener("click", restartGame);
