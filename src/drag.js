import { addShips, notDropped, shipArray, angle } from "./ships";

let draggedShip;

export function dragStart(e) {
    draggedShip = e.target;
    notDropped = false;
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

    if(!notDropped) {
        draggedShip.remove();
    }
}

export function handleValidity(computerBoard, isHorizontal, startIndex, ship) {
    let validStart = isHorizontal ? startIndex <= 100 - ship.length ? startIndex : 
        100 - ship.length : 
        startIndex <= 100 - 10 * ship.length ? startIndex : 
            startIndex - ship.length * 10 + 10;

    let shipBlocks = [];

    for(let i = 0; i < ship.length; i++) {
        if(isHorizontal) {
            shipBlocks.push(computerBoard[Number(validStart) + i])
        } else {
            shipBlocks.push(computerBoard[Number(validStart) + i * 10])
        }
    }

    let valid;
    
    if(isHorizontal) {
        valid = shipBlocks.every((_shipBlock, index) =>
            shipBlocks[0].id % 10 !== 10 - (shipBlocks.length - (index + 1)));
    } else {
        valid = shipBlocks.every((_shipBlock, index) => 
            shipBlocks[0].id < 90 + (10 * index + 1));
    }

    const notTaken = shipBlocks.every(shipBlock => !shipBlock.classList.contains('taken'));

    return {shipBlocks, valid, notTaken};
}

function highlight(startIndex, ship) {
    const boardBlocks = document.querySelectorAll('#player div');

    let isHorizontal = angle === 0;

    const {shipBlocks, valid, notTaken} = handleValidity(boardBlocks, isHorizontal, startIndex, ship);

    if(valid && notTaken) {
        shipBlocks.forEach(shipBlock => {
            shipBlock.classList.add('hover');
            setTimeout(() => shipBlock.classList.remove('hover'), 300);
        })
    }
}