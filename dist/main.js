/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/gameBoard.js":
/*!**************************!*\
  !*** ./src/gameBoard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Gameboard)\n/* harmony export */ });\nconst boardContainer = document.getElementById('board-container');\nconst occupiedCells = new Set();\n\nclass Gameboard {\n    constructor(size) {\n        this.size = size;\n    }\n\n    createBoard(user) {\n        \n        const width = this.size * this.size;\n\n        const board = document.createElement('div');\n        board.classList.add('grid');\n        board.id = user;\n\n        for(let i = 0; i < width; i++) {\n            const cell = document.createElement('div');\n            cell.classList.add('cell');\n            cell.id = i;\n            board.append(cell);\n        }\n\n        boardContainer.append(board)\n    }\n    \n    placeShip(row, col, length, isHorizontal = true) {\n        const newOccupiedCells = new Set();\n\n        for (let i = 0; i < length; i++) {\n            \n            const currentRow = isHorizontal ? row : row + i;\n            const currentCol = isHorizontal ? col + i : col;\n      \n            const cell = document.querySelector(`[data-row=\"${currentRow}\"][data-col=\"${currentCol}\"]`);\n            \n            if (occupiedCells.has(`${currentRow}-${currentCol}`)) {\n\n                console.log(\"Ship overlap detected!\");\n                return;\n            }\n      \n            newOccupiedCells.add(`${currentRow}-${currentCol}`);\n        }\n      \n        // If no overlap detected, add the new occupied cells to the main set\n        newOccupiedCells.forEach((cell) => occupiedCells.add(cell));\n      \n        // Place the ship on the board\n        for (const cell of newOccupiedCells) {\n            const [row, col] = cell.split(\"-\").map(Number);\n            const cellElement = document.querySelector(`[data-row=\"${row}\"][data-col=\"${col}\"]`);\n            cellElement.classList.add(\"ship\");\n        }\n    }\n    \n    coordinates() {\n        playerGrid.addEventListener('click', (e) => {\n\n            const clickedCell = e.target;\n            const row = parseInt(clickedCell.getAttribute('data-row'));\n            const col = parseInt(clickedCell.getAttribute('data-col'));\n            \n            if(!isNaN(row) && !isNaN(col)) {\n                this.placeShip(row, col, 4);\n            }\n        })\n    }\n}\n\n\n//# sourceURL=webpack://project-battleship/./src/gameBoard.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _gameBoard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameBoard */ \"./src/gameBoard.js\");\n/* harmony import */ var _ships__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ships */ \"./src/ships.js\");\n/* harmony import */ var _ships__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_ships__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nconst flipBtn = document.getElementById('flip-button');\n\nconst board = new _gameBoard__WEBPACK_IMPORTED_MODULE_0__[\"default\"](10)\n\nboard.createBoard('player')\nboard.createBoard('computer');\n\nflipBtn.addEventListener('click', _ships__WEBPACK_IMPORTED_MODULE_1__.flipShips);\n\n\n\n\nconst destroyer = new _ships__WEBPACK_IMPORTED_MODULE_1__.Ship('destroyer', 2);\nconst submarine = new _ships__WEBPACK_IMPORTED_MODULE_1__.Ship('submarine', 3);\nconst cruiser = new _ships__WEBPACK_IMPORTED_MODULE_1__.Ship('cruiser', 3);\nconst battleship = new _ships__WEBPACK_IMPORTED_MODULE_1__.Ship('battleship', 4);\nconst carrier = new _ships__WEBPACK_IMPORTED_MODULE_1__.Ship('carrier', 5);\n\n\n\nconst shipArray = [destroyer, submarine, cruiser, battleship, carrier]\n\nshipArray.forEach(ship => {\n    ;(0,_ships__WEBPACK_IMPORTED_MODULE_1__.addShips)(ship)\n});\n\n//# sourceURL=webpack://project-battleship/./src/index.js?");

/***/ }),

/***/ "./src/ships.js":
/*!**********************!*\
  !*** ./src/ships.js ***!
  \**********************/
/***/ ((module) => {

eval("class Ship {\n    constructor(name, length) {\n        this.name = name;\n        this.length = length;\n    }\n}\n\nlet angle = 0;\n\nfunction flipShips() {\n    const ships = document.querySelector('.options');\n\n    const arrayShips = Array.from(ships.children)\n    \n    if(angle === 0) {\n        angle = 90;\n    } else {\n        angle = 0;\n    }\n\n    arrayShips.forEach(ship => {\n        ship.style.transform = `rotate(${angle}deg)`\n    });\n}\n\nfunction addShips(ship) {\n    const computerBoard = document.querySelectorAll('#computer div');\n\n    let randomBool = Math.random() < 0.5;\n    let isHorizontal = randomBool;\n    let randomStart = Math.floor(Math.random() * 100);\n\n    let validStart = isHorizontal ? randomStart <= 100 - ship.length ? randomStart : \n        100 - ship.length : \n        randomStart <= 100 - 10 * ship.length ? randomStart : \n            randomStart - ship.length * 10 + 10;\n\n    let shipBlocks = [];\n\n    for(let i = 0; i < ship.length; i++) {\n        if(isHorizontal) {\n            shipBlocks.push(computerBoard[Number(validStart) + i])\n        } else {\n            shipBlocks.push(computerBoard[Number(validStart) + i * 10])\n        }\n    }\n\n    let valid;\n    \n    if(isHorizontal) {\n        valid = shipBlocks.every((_shipBlock, index) =>\n            shipBlocks[0].id % 10 !== 10 - (shipBlocks.length - (index + 1)));\n    } else {\n        valid = shipBlocks.every((_shipBlock, index) => \n            shipBlocks[0].id < 90 + (10 * index + 1));\n    }\n\n    const notTaken = shipBlocks.every(shipBlock => !shipBlock.classList.contains('taken'));\n    \n    if(valid && notTaken) {\n        shipBlocks.forEach(shipBlock => {\n            shipBlock.classList.add(ship.name);\n            shipBlock.classList.add('taken');\n        })\n    } else {\n        addShips(ship)\n    }\n}\n\n\nmodule.exports = { flipShips, Ship, addShips}\n\n//# sourceURL=webpack://project-battleship/./src/ships.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;