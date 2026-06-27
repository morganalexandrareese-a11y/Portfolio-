const choices = ['rock', 'paper', 'scissors'];
const choiceEmojis = { rock: '🪨', paper: '📄', scissors: '✂️' };
let playerScore = 0;
let computerScore = 0;

function playGame(playerChoice) {
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    const playerChoiceEl = document.getElementById('player-choice');
    const computerChoiceEl = document.getElementById('computer-choice');
    const resultText = document.getElementById('result-text');
    const choiceBtns = document.querySelectorAll('.choice-btn');
    
    playerChoiceEl.textContent = `${choiceEmojis[playerChoice]} ${playerChoice}`;
    computerChoiceEl.textContent = `${choiceEmojis[computerChoice]} ${computerChoice}`;
    
    choiceBtns.forEach(btn => btn.classList.remove('selected'));
    document.querySelector(`[data-choice="${playerChoice}"]`).classList.add('selected');
    
    let result = '';
    
    if (playerChoice === computerChoice) {
        result = "It's a tie!";
    } else if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        result = '🎉 You win!';
        playerScore++;
    } else {
        result = '💻 Computer wins!';
        computerScore++;
    }
    
    resultText.textContent = result;
    document.getElementById('player-score').textContent = playerScore;
    document.getElementById('computer-score').textContent = computerScore;
}

document.querySelectorAll('.choice-btn').forEach(btn => {
    btn.addEventListener('click', () => playGame(btn.dataset.choice));
});

document.getElementById('reset-btn').addEventListener('click', () => {
    playerScore = 0;
    computerScore = 0;
    document.getElementById('player-score').textContent = '0';
    document.getElementById('computer-score').textContent = '0';
    document.getElementById('result-text').textContent = 'Make your choice!';
    document.getElementById('player-choice').textContent = '-';
    document.getElementById('computer-choice').textContent = '-';
    document.querySelectorAll('.choice-btn').forEach(btn => btn.classList.remove('selected'));
});