const gridId = document.getElementById('gridId');

export default class Gameboard {
    constructor(size) {
        this.size = size;
    }

    createBoard() {
        
        for(let row = 0; row < this.size; row++) {
            for(let col = 0; col < this.size; col++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.setAttribute('data-row', row);
                cell.setAttribute('data-col', col);
                gridId.appendChild(cell);
            }
        }
    }

    coordinates() {
        gridId.addEventListener('click', (e) => {
            const clickedCell = e.target;
            const row = clickedCell.getAttribute('data-row');
            const col = clickedCell.getAttribute('data-col');

            console.log(row, col)
        })
    }
}


