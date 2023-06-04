'use strict';

const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');
const diceElement = document.querySelector('.dice');
const player0ScoreElement = document.querySelector('#score--0');
const player1ScoreElement = document.querySelector('#score--1');
const player0CurrentScoreElement = document.querySelector('#current--0');
const player1CurrentScoreElement = document.querySelector('#current--1');
const rollButton = document.querySelector('.btn--roll');
const newGame = document.querySelector('.btn--new');
const holdButton = document.querySelector('.btn--hold');


let playerElement;


const showModal = document.querySelector('.btn--how');
const modal = document.querySelector('.modal');
const closeModal = document.querySelector('.close-modal');
const overlay = document.querySelector('.overlay');

function modalShow() {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
}

function modalHide() {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
}


let diceNum, currentScores, scores, activePlayer, gameIsFinished;

// function to generate random dice number.
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

// initial conditions to start the game.
function gameBegins() {
    console.log('gameBegins');
    currentScores = [0, 0];
    scores = [0, 0];
    activePlayer = 0;
    gameIsFinished = false;

    player0ScoreElement.textContent = scores[0];
    player1ScoreElement.textContent = scores[1];
    player0CurrentScoreElement.textContent = currentScores[0];
    player1CurrentScoreElement.textContent = currentScores[1];

    diceElement.classList.add('hidden');
    player0Element.classList.remove('player--winner');
    player1Element.classList.remove('player--winner');
    player0Element.classList.add('player--active');
    player1Element.classList.remove('player--active');
}

// function that checks whether a player has won the game or not. if not then switch the player.
function checkForWin(activePlayer) {
    if (scores[activePlayer] >= 100) {
        playerElement = activePlayer === 0 ? player0Element : player1Element;
        playerElement.classList.add(`player--winner`);
        player0Element.classList.remove(`player--active`);
        player1Element.classList.remove(`player--active`);
        gameIsFinished = true;
        diceElement.classList.add(`hidden`);
    } else {
        switchPlayer();
    }
}
// Function to switch players
function switchPlayer() {
    player0Element.classList.toggle(`player--active`);
    player1Element.classList.toggle(`player--active`);
    activePlayer = activePlayer ? 0 : 1;
}

// Start Game with initial conditions
gameBegins();

rollButton.addEventListener('click', function() {

    // checking to continue only if the game has not finished already.
    if (!gameIsFinished) {

        // 1. Generating a random number between 1 and 6
        diceNum = Number(getRandomNumber(1, 7));

        // 2. Displaying the number on dice
        let src = `images/dice-${diceNum}.png`;
        diceElement.classList.remove('hidden');
        diceElement.src = src;

        // 3. Check for 6. if diceNum = 6 then switch player
        if (diceNum === 6) {

            //  Switch Player
            currentScores[activePlayer] = 0;
            playerElement = activePlayer === 0 ? player0CurrentScoreElement : player1CurrentScoreElement;
            playerElement.textContent = currentScores[activePlayer];
            switchPlayer();
        } else {

            // Add to current score
            currentScores[activePlayer] += diceNum;
            playerElement = activePlayer === 0 ? player0CurrentScoreElement : player1CurrentScoreElement;
            playerElement.textContent = currentScores[activePlayer];

        }
    }
});

//  holding values
holdButton.addEventListener('click', function() {

    if (!gameIsFinished) {

        // 1. adding current score to total scores and displaying it.
        scores[activePlayer] += currentScores[activePlayer];
        playerElement = activePlayer === 0 ? player0ScoreElement : player1ScoreElement;
        playerElement.textContent = scores[activePlayer];
        currentScores[activePlayer] = 0;
        playerElement = activePlayer === 0 ? player0CurrentScoreElement : player1CurrentScoreElement;
        playerElement.textContent = currentScores[activePlayer];

        // 2. Finishing the game.
        checkForWin(activePlayer);
    }
});

// New Game Button
newGame.addEventListener('click', gameBegins);

showModal.addEventListener('click', modalShow);
closeModal.addEventListener('click', modalHide);
overlay.addEventListener('click', modalHide);
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && (!modal.classList.contains('hidden'))) {
        modalHide();
    }
});