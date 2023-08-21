import { handleValidity, isDropped } from "./drag";

export let angle = 0;

export let isDroppedShip;

export class CreateShip {
    constructor(name, length) {
        this.name = name;
        this.length = length;
    }
}

export function flipShips() {
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

export function addShips(user, ship, startId) {

    const computerBoard = document.querySelectorAll(`#${user} div`);

    
    let randomBool = Math.random() < 0.5;
    let isHorizontal = user === 'player' ? angle === 0 : randomBool;
    let randomStart = Math.floor(Math.random() * 100);
    
    let startIndex = startId ? startId : randomStart;
    
    const {shipBlocksArray, valid, notTaken} = handleValidity(computerBoard, isHorizontal, startIndex, ship)

    
    if(valid && notTaken) {
        shipBlocksArray.forEach(shipBlock => {
            shipBlock.classList.add(ship.name); 
            shipBlock.classList.add('taken');
        }) 
    } else {
        if(user === 'computer') {addShips('computer', ship, startId)}
        if(user === 'player') isDropped = true;
    }
}

const destroyer = new CreateShip('destroyer', 2);
const submarine = new CreateShip('submarine', 3);
const cruiser = new CreateShip('cruiser', 3);
const battleship = new CreateShip('battleship', 4);
const carrier = new CreateShip('carrier', 5);

export const shipArray = [destroyer, submarine, cruiser, battleship, carrier];
