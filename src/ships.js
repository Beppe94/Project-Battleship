class Ship {
    constructor(length, hitAmount, sunk = false) {
        this.length = length;
        this.hitAmount = hitAmount;
    }

    hit() {
        return this.hitAmount++;
    }

    isSunk() {
        return this.length - this.hitAmount === 0 ? true: false;
    }
}

const cruiser = new Ship(4, 0);
