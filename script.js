const moves = {
  rock: { emoji: "✊", label: "Rock" },
  paper: { emoji: "✋", label: "Paper" },
  scissors: { emoji: "✌️", label: "Scissors" }
};

let playerScore = 0;
let computerScore = 0;

const playerScoreEl = document.getElementById("player-score");
const computerScoreEl = document.getElementById("computer-score");
const playerHand = document.getElementById("player-hand");
const computerHand = document.getElementById("computer-hand");
const playerChoiceEl = document.getElementById("player-choice");
const computerChoiceEl = document.getElementById("computer-choice");
const resultPanel = document.querySelector(".result-panel");
const resultTitle = document.getElementById("result-title");
const resultMessage = document.getElementById("result-message");

function playRound(playerMove) {
  const options = Object.keys(moves);
  const computerMove = options[Math.floor(Math.random() * options.length)];

  playerHand.textContent = moves[playerMove].emoji;
  computerHand.textContent = moves[computerMove].emoji;
  playerChoiceEl.textContent = moves[playerMove].label;
  computerChoiceEl.textContent = moves[computerMove].label;

  resultPanel.className = "result-panel";

  if (playerMove === computerMove) {
    resultTitle.textContent = "It's a tie!";
    resultMessage.textContent = "You both chose " + moves[playerMove].label + ". Try again!";
    resultPanel.classList.add("tie");
  } else if (
    (playerMove === "rock" && computerMove === "scissors") ||
    (playerMove === "paper" && computerMove === "rock") ||
    (playerMove === "scissors" && computerMove === "paper")
  ) {
    playerScore++;
    resultTitle.textContent = "You win this round!";
    resultMessage.textContent = moves[playerMove].label + " beats " + moves[computerMove].label + ".";
    resultPanel.classList.add("win");
  } else {
    computerScore++;
    resultTitle.textContent = "Computer wins this round!";
    resultMessage.textContent = moves[computerMove].label + " beats " + moves[playerMove].label + ".";
    resultPanel.classList.add("lose");
  }

  playerScoreEl.textContent = playerScore;
  computerScoreEl.textContent = computerScore;
}

document.querySelectorAll(".choice-button").forEach((button) => {
  button.addEventListener("click", () => playRound(button.dataset.choice));
});

document.getElementById("reset-button").addEventListener("click", () => {
  playerScore = 0;
  computerScore = 0;
  playerScoreEl.textContent = "0";
  computerScoreEl.textContent = "0";
  playerHand.textContent = "✊";
  computerHand.textContent = "✊";
  playerChoiceEl.textContent = "Waiting...";
  computerChoiceEl.textContent = "Waiting...";
  resultPanel.className = "result-panel";
  resultTitle.textContent = "Make your move!";
  resultMessage.textContent = "First to choose starts the match.";
});
