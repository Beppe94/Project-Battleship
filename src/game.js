const shipContainer = document.querySelector('.options');
const infoDisplay = document.getElementById('info-div');
const turnDisplay = document.getElementById('turn-display');

let gameOver = false;
let playerTurn;

export function startGame() {

    if(shipContainer.children.length != 0) {
        infoDisplay.textContent = 'Infos: Place down the ships first';
    } else {
        const computerAllBlocks = document.querySelectorAll("#computer div")
        computerAllBlocks.forEach(block => block.addEventListener('click', handleClick))
    }
}

let playerHits = [];
let computerHits = [];
const playerSunkShips = [];
const computerSunkShips = [];

function handleClick(e) {
    if(!gameOver) {
        if(e.target.classList.contains('taken')) {
            e.target.classList.add('boom');
            infoDisplay.textContent = 'Infos: Enemy ship hit';
            let classes = Array.from(e.target.classList)
            classes = classes.filter(className => className !== 'block');
            classes = classes.filter(className => className !== 'boom');
            classes = classes.filter(className => className !== 'taken');
            classes = classes.filter(className => className !== 'cell');
            playerHits.push(...classes);
            checkScore('player', playerHits, playerSunkShips);
        }

        if(!e.target.classList.contain('taken')) {
            infoDisplay.textContent = 'Infos: Target Missed.'
            e.target.classList.add('empty')
        }

        playerTurn = false;

        const allComputerBlocks = document.querySelectorAll('#computer div');
        allComputerBlocks.forEach(block => block.replaceWith(block.cloneNode(true)))
        setTimeout(computerTurn, 3000);
    }
}


function computerTurn() {
    if(!gameOver) {
        infoDisplay.textContent = 'Computer\'s thinking...';
        turnDisplay.textContent = 'Computer\'s Turn';

        setTimeout(() => {
          let random = Math.floor(Math.random() * 10 * 10);  
          const allPlayerBlocks = document.querySelectorAll('#player div');
          if(allPlayerBlocks[random].classList.contains('taken') && allPlayerBlocks[random].classList.contains('boom')) {
            computerTurn();
            return;
          } else if(allPlayerBlocks[random].classList.contains('taken') && !allPlayerBlocks[random].classList.contains('boom')) {
            allPlayerBlocks[random].classList.add('boom');
            infoDisplay.textContent = 'Enemy hit us!';
            let classes = Array.from(e.target.classList)
            classes = classes.filter(className => className !== 'block');
            classes = classes.filter(className => className !== 'boom');
            classes = classes.filter(className => className !== 'taken');
            classes = classes.filter(className => className !== 'cell');
            computerHits.push(...classes);
            checkScore('computer', computerHits, computerSunkShips)
            } else {
                infoDisplay.textContent = 'Enemy missed us!';
                allPlayerBlocks[random].classList.add('empty');
            }
        }, 3000);

        setTimeout(() => {
            playerTurn = true;
            infoDisplay.textContent = 'Take aim!';
            turnDisplay.textContent = 'Your Turn!';
            const allComputerBlocks = document.querySelectorAll('#computer div');
            allComputerBlocks.forEach(block => block.addEventListener('click', handleClick))
        }, 6000);
    }
}

function checkScore(user, hits, sunk) {

    function checkShip(shipName, shipLength) {
        hits.filter()
    }

}