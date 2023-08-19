const boardContainer = document.getElementById('board-container');

export default class Gameboard {
    constructor(size) {
        this.size = size;
    }

    createBoard(user) {
        
        const width = this.size * this.size;

        const board = document.createElement('div');
        board.classList.add('grid');
        board.id = user;

        for(let i = 0; i < width; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.id = i;
            board.append(cell);
        }

        boardContainer.append(board)
    }
}
