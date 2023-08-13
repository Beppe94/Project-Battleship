class Ship {
    constructor(name, length) {
        this.name = name;
        this.length = length;
    }
}

let angle = 0;

function flipShips() {
    const ships = document.querySelector('.options');

    const arrayShips = Array.from(ships.children)
    
    if(angle === 0) {
        angle = 90;
    } else {
        angle = 0;
    }

    arrayShips.forEach(ship => {
        ship.style.transform = `rotate(${angle}deg)`
    });
}

function addShips(ship) {
    const computerBoard = document.querySelectorAll('#computer div');

    let randomBool = Math.random() < 0.5;
    let isHorizontal = randomBool;
    let randomStart = Math.floor(Math.random() * 100);

    let validStart = isHorizontal ? randomStart <= 100 - ship.length ? randomStart : 
        100 - ship.length : 
        randomStart <= 100 - 10 * ship.length ? randomStart : 
            randomStart - ship.length * 10 + 10;

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
    
    if(valid && notTaken) {
        shipBlocks.forEach(shipBlock => {
            shipBlock.classList.add(ship.name);
            shipBlock.classList.add('taken');
        })
    } else {
        addShips(ship)
    }
}


module.exports = { flipShips, Ship, addShips}