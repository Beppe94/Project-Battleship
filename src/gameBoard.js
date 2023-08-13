const boardContainer = document.getElementById('board-container');
const occupiedCells = new Set();

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
    
    placeShip(row, col, length, isHorizontal = true) {
        const newOccupiedCells = new Set();

        for (let i = 0; i < length; i++) {
            
            const currentRow = isHorizontal ? row : row + i;
            const currentCol = isHorizontal ? col + i : col;
      
            const cell = document.querySelector(`[data-row="${currentRow}"][data-col="${currentCol}"]`);
            
            if (occupiedCells.has(`${currentRow}-${currentCol}`)) {

                console.log("Ship overlap detected!");
                return;
            }
      
            newOccupiedCells.add(`${currentRow}-${currentCol}`);
        }
      
        // If no overlap detected, add the new occupied cells to the main set
        newOccupiedCells.forEach((cell) => occupiedCells.add(cell));
      
        // Place the ship on the board
        for (const cell of newOccupiedCells) {
            const [row, col] = cell.split("-").map(Number);
            const cellElement = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
            cellElement.classList.add("ship");
        }
    }
    
    coordinates() {
        playerGrid.addEventListener('click', (e) => {

            const clickedCell = e.target;
            const row = parseInt(clickedCell.getAttribute('data-row'));
            const col = parseInt(clickedCell.getAttribute('data-col'));
            
            if(!isNaN(row) && !isNaN(col)) {
                this.placeShip(row, col, 4);
            }
        })
    }
}
