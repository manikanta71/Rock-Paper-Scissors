let userScore = 0;
let compScore = 0;
const Target = 10;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");

const userScorePara = document.querySelector("#userScore");
const compScorePara = document.querySelector("#compScore");

const genCompChoice = () => {
  const options = ["rock", "paper", "scissors"];
  const randIdx = Math.floor(Math.random() * 3);
  return options[randIdx];
};

const drawGame = () => {
  msg.innerText = "Game was Draw. Play again.";
  msg.style.backgroundColor = "#081b31";
};

const showWinner = (userWin, userChoice, compChoice) => {
  if (userWin) {
    userScore++;
    userScorePara.innerText = userScore;
    msg.innerText = `You win! Your ${userChoice} beats ${compChoice}`;
    msg.style.backgroundColor = "green";
  } else {
    compScore++;
    compScorePara.innerText = compScore;
    msg.innerText = `You lost. ${compChoice} beats your ${userChoice}`;
    msg.style.backgroundColor = "red";
  }
};

const checkEndGame = () => {
  if (userScore === Target || compScore === Target) {
    if (userScore > compScore){
      msg.innerText = `Game End! you win!`;
    } else {
      msg.innerText = `Game End! Computer win!`;
    }
    msg.style.backgroundColor = "green";
    choices.forEach(choice => choice.removeEventListener("click", handleClick));
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

choices.forEach(choice => choice.addEventListener("click", handleClick));
