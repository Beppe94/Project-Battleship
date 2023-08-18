const shipContainer = document.querySelector('.options');
const infoDisplay = document.getElementById('info-div');
const turnDisplay = document.getElementById('turn-display');

let gameOver = false;
let playerTurn;

export function startGame() {

    if(playerTurn === undefined) {
        if(shipContainer.children.length != 0) {
            infoDisplay.textContent = 'Infos: Place down the ships first';
        } else {
            const computerAllBlocks = document.querySelectorAll("#computer div");
            computerAllBlocks.forEach(block => block.addEventListener('click', handleClick));
            playerTurn = true;
            infoDisplay.textContent = 'Infos: The game has started!';
            turnDisplay.textContent = 'Turn: Your turn';
        }
    }
}

let playerHits = [];
let computerHits = [];
const playerSunkShips = [];
const computerSunkShips = [];

function handleClick(e) {
    if(!gameOver) {
        if(e.target.classList.contains('boom') || e.target.classList.contains('empty')) {
            infoDisplay.textContent = 'Infos: We already hit that spot';
            return;
        } else if(e.target.classList.contains('taken')) {
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

        if(!e.target.classList.contains('taken')) {
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
        infoDisplay.textContent = 'Infos: Computer\'s thinking...';
        turnDisplay.textContent = 'Turn: Computer\'s Turn';

            let random = Math.floor(Math.random() * 10 * 10);  
            const allPlayerBlocks = document.querySelectorAll('#player div');
            if(allPlayerBlocks[random].classList.contains('boom') || allPlayerBlocks[random].classList.contains('empty')) {
                computerTurn();
                return;
            } else if(allPlayerBlocks[random].classList.contains('taken') && !allPlayerBlocks[random].classList.contains('boom')) {
                infoDisplay.textContent = 'Infos: Enemy hit us!';
                allPlayerBlocks[random].classList.add('boom');
                let classes = Array.from(allPlayerBlocks[random].classList)
                classes = classes.filter(className => className !== 'block');
                classes = classes.filter(className => className !== 'boom');
                classes = classes.filter(className => className !== 'taken');
                classes = classes.filter(className => className !== 'cell');
                computerHits.push(...classes);
                setTimeout(() => {
                    computerTurn();
                }, 2000);
                checkScore('computer', computerHits, computerSunkShips);
            } else {
                infoDisplay.textContent = 'Infos: Enemy missed us!';
                allPlayerBlocks[random].classList.add('empty');
            }

        setTimeout(() => {
            playerTurn = true;
            infoDisplay.textContent = 'Infos: Take aim!';
            turnDisplay.textContent = 'Turn: Your Turn!';
            const allComputerBlocks = document.querySelectorAll('#computer div');
            allComputerBlocks.forEach(block => block.addEventListener('click', handleClick))
        }, 2000);
    }
}

function checkScore(user, hits, sunk) {

    function checkShip(shipName, shipLength) {
        if(hits.filter(storedShip => storedShip === shipName).length === shipLength) {
            if(user === 'player') {
                infoDisplay.textContent = `Infos: You sunk the enemy's ${shipName}`;
                playerHits = hits.filter(storedShip => storedShip !== shipName)
            }
            if(user === 'computer') {
                infoDisplay.textContent = `Infos: The enemy sunk our ${shipName}`;
                computerHits = hits.filter(storedShip => storedShip !== shipName)
            }
            sunk.push(shipName)
        }
    }

    checkShip('destroyer', 2);
    checkShip('submarine', 3);
    checkShip('cruiser', 3);
    checkShip('battleship', 4);
    checkShip('carrier', 5);

    if(playerSunkShips.length === 5) {
        infoDisplay.textContent = 'Infos: You sunk all the enemy\'s ships, you won!!';
        gameOver = true;
    }
    if(computerSunkShips === 5) {
        infoDisplay.textContent = 'Infos: The enemy sunk all our ships, we lost..';
        gameOver = true;
    }
}



