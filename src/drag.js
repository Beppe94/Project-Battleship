import { addShips, shipArray, angle } from "./ships";

let draggedShip;

export let isDropped;

export function dragStart(e) {
    draggedShip = e.target;

    isDropped = false
}

export function dragOver(e) {
    e.preventDefault();
    
    const ship = shipArray[draggedShip.id];
    highlight(e.target.id, ship)
}

export function dropShip(e) {
    
    const startId = e.target.id;
    const ship = shipArray[draggedShip.id];
    
    addShips('player', ship, startId);
    
    if(!isDropped) {
        draggedShip.remove();
        draggedShip = '';
    }
}

export function handleValidity(computerBoard, isHorizontal, startIndex, ship) {
    let validStart = isHorizontal ? startIndex <= 100 - ship.length ? startIndex : 
        100 - ship.length : 
        startIndex <= 100 - 10 * ship.length ? startIndex : 
            startIndex - ship.length * 10 + 10;

    let shipBlocksArray = [];

    for(let i = 0; i < ship.length; i++) {
        if(isHorizontal) {
            shipBlocksArray.push(computerBoard[Number(validStart) + i])
        } else {
            shipBlocksArray.push(computerBoard[Number(validStart) + i * 10])
        }
    }

    let valid;
    
    if(isHorizontal) {
        valid = shipBlocksArray.every((_shipBlock, index) =>
            shipBlocksArray[0].id % 10 !== 10 - (shipBlocksArray.length - (index + 1)));
    } else {
        valid = shipBlocksArray.every((_shipBlock, index) => 
            shipBlocksArray[0].id < 90 + (10 * index + 1));
    }

    const notTaken = shipBlocksArray.every(shipBlock => !shipBlock.classList.contains('taken'));
    
    return {shipBlocksArray, valid, notTaken};
}

function highlight(startIndex, ship) {
    const boardBlocks = document.querySelectorAll('#player div');

    let isHorizontal = angle === 0;

    const {shipBlocksArray, valid, notTaken} = handleValidity(boardBlocks, isHorizontal, startIndex, ship);

    if(valid && notTaken) {
        shipBlocksArray.forEach(highlight => {
            highlight.classList.add('hover');
            setTimeout(() => highlight.classList.remove('hover'), 400);
        })
    }
}