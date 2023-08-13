import Gameboard from "./gameBoard";
import { flipShips, Ship, addShips} from "./ships";

const flipBtn = document.getElementById('flip-button');

const board = new Gameboard(10)

board.createBoard('player')
board.createBoard('computer');

flipBtn.addEventListener('click', flipShips);




const destroyer = new Ship('destroyer', 2);
const submarine = new Ship('submarine', 3);
const cruiser = new Ship('cruiser', 3);
const battleship = new Ship('battleship', 4);
const carrier = new Ship('carrier', 5);



const shipArray = [destroyer, submarine, cruiser, battleship, carrier]

shipArray.forEach(ship => {
    addShips(ship)
});