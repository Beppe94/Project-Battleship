import Gameboard from "./gameBoard";
import { flipShips, shipArray, addShips } from "./ships";
import { dropShip, dragOver, dragStart } from "./drag";
import { startGame } from "./game";

const board = new Gameboard(10)
board.createBoard('player')
board.createBoard('computer');

const startBtn = document.querySelector('#start-button');
const flipBtn = document.getElementById('flip-button');
const playerBlocks = document.querySelectorAll('#player div');
const options = document.querySelector('.options');

flipBtn.addEventListener('click', flipShips);

shipArray.forEach(ship => {
    addShips('computer', ship);
});

const optionsArray = Array.from(options.children);
optionsArray.forEach(optionShip => optionShip.addEventListener('dragstart', dragStart));

playerBlocks.forEach(block => {
    block.addEventListener('dragover', dragOver);
    block.addEventListener('drop', dropShip);
})

startBtn.addEventListener('click', startGame);