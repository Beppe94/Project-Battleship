/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/drag.js":
/*!*********************!*\
  !*** ./src/drag.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   dragOver: () => (/* binding */ dragOver),\n/* harmony export */   dragStart: () => (/* binding */ dragStart),\n/* harmony export */   dropShip: () => (/* binding */ dropShip),\n/* harmony export */   handleValidity: () => (/* binding */ handleValidity)\n/* harmony export */ });\n/* harmony import */ var _ships__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ships */ \"./src/ships.js\");\n\n\nlet draggedShip;\n\nfunction dragStart(e) {\n    draggedShip = e.target;\n    _ships__WEBPACK_IMPORTED_MODULE_0__.notDropped = false;\n}\n\nfunction dragOver(e) {\n    e.preventDefault();\n    \n    const ship = _ships__WEBPACK_IMPORTED_MODULE_0__.shipArray[draggedShip.id];\n    highlight(e.target.id, ship)\n}\n\nfunction dropShip(e) {\n\n    const startId = e.target.id;\n    const ship = _ships__WEBPACK_IMPORTED_MODULE_0__.shipArray[draggedShip.id];\n\n    (0,_ships__WEBPACK_IMPORTED_MODULE_0__.addShips)('player', ship, startId);\n\n    if(!_ships__WEBPACK_IMPORTED_MODULE_0__.notDropped) {\n        draggedShip.remove();\n    }\n}\n\nfunction handleValidity(computerBoard, isHorizontal, startIndex, ship) {\n    let validStart = isHorizontal ? startIndex <= 100 - ship.length ? startIndex : \n        100 - ship.length : \n        startIndex <= 100 - 10 * ship.length ? startIndex : \n            startIndex - ship.length * 10 + 10;\n\n    let shipBlocks = [];\n\n    for(let i = 0; i < ship.length; i++) {\n        if(isHorizontal) {\n            shipBlocks.push(computerBoard[Number(validStart) + i])\n        } else {\n            shipBlocks.push(computerBoard[Number(validStart) + i * 10])\n        }\n    }\n\n    let valid;\n    \n    if(isHorizontal) {\n        valid = shipBlocks.every((_shipBlock, index) =>\n            shipBlocks[0].id % 10 !== 10 - (shipBlocks.length - (index + 1)));\n    } else {\n        valid = shipBlocks.every((_shipBlock, index) => \n            shipBlocks[0].id < 90 + (10 * index + 1));\n    }\n\n    const notTaken = shipBlocks.every(shipBlock => !shipBlock.classList.contains('taken'));\n\n    return {shipBlocks, valid, notTaken};\n}\n\nfunction highlight(startIndex, ship) {\n    const boardBlocks = document.querySelectorAll('#player div');\n\n    let isHorizontal = _ships__WEBPACK_IMPORTED_MODULE_0__.angle === 0;\n\n    const {shipBlocks, valid, notTaken} = handleValidity(boardBlocks, isHorizontal, startIndex, ship);\n\n    if(valid && notTaken) {\n        shipBlocks.forEach(shipBlock => {\n            shipBlock.classList.add('hover');\n            setTimeout(() => shipBlock.classList.remove('hover'), 300);\n        })\n    }\n}\n\n//# sourceURL=webpack://project-battleship/./src/drag.js?");

/***/ }),

/***/ "./src/gameBoard.js":
/*!**************************!*\
  !*** ./src/gameBoard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Gameboard)\n/* harmony export */ });\nconst boardContainer = document.getElementById('board-container');\nconst occupiedCells = new Set();\n\nclass Gameboard {\n    constructor(size) {\n        this.size = size;\n    }\n\n    createBoard(user) {\n        \n        const width = this.size * this.size;\n\n        const board = document.createElement('div');\n        board.classList.add('grid');\n        board.id = user;\n\n        for(let i = 0; i < width; i++) {\n            const cell = document.createElement('div');\n            cell.classList.add('cell');\n            cell.id = i;\n            board.append(cell);\n        }\n\n        boardContainer.append(board)\n    }\n    \n    placeShip(row, col, length, isHorizontal = true) {\n        const newOccupiedCells = new Set();\n\n        for (let i = 0; i < length; i++) {\n            \n            const currentRow = isHorizontal ? row : row + i;\n            const currentCol = isHorizontal ? col + i : col;\n      \n            const cell = document.querySelector(`[data-row=\"${currentRow}\"][data-col=\"${currentCol}\"]`);\n            \n            if (occupiedCells.has(`${currentRow}-${currentCol}`)) {\n\n                console.log(\"Ship overlap detected!\");\n                return;\n            }\n      \n            newOccupiedCells.add(`${currentRow}-${currentCol}`);\n        }\n      \n        // If no overlap detected, add the new occupied cells to the main set\n        newOccupiedCells.forEach((cell) => occupiedCells.add(cell));\n      \n        // Place the ship on the board\n        for (const cell of newOccupiedCells) {\n            const [row, col] = cell.split(\"-\").map(Number);\n            const cellElement = document.querySelector(`[data-row=\"${row}\"][data-col=\"${col}\"]`);\n            cellElement.classList.add(\"ship\");\n        }\n    }\n    \n    coordinates() {\n        playerGrid.addEventListener('click', (e) => {\n\n            const clickedCell = e.target;\n            const row = parseInt(clickedCell.getAttribute('data-row'));\n            const col = parseInt(clickedCell.getAttribute('data-col'));\n            \n            if(!isNaN(row) && !isNaN(col)) {\n                this.placeShip(row, col, 4);\n            }\n        })\n    }\n}\n\n\n//# sourceURL=webpack://project-battleship/./src/gameBoard.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _gameBoard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameBoard */ \"./src/gameBoard.js\");\n/* harmony import */ var _ships__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ships */ \"./src/ships.js\");\n/* harmony import */ var _drag__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./drag */ \"./src/drag.js\");\n\n\n\n\nconst board = new _gameBoard__WEBPACK_IMPORTED_MODULE_0__[\"default\"](10)\nboard.createBoard('player')\nboard.createBoard('computer');\n\nconst flipBtn = document.getElementById('flip-button');\nconst playerBlocks = document.querySelectorAll('#player div');\nconst options = document.querySelector('.options');\n\n\n\nflipBtn.addEventListener('click', _ships__WEBPACK_IMPORTED_MODULE_1__.flipShips);\n\n\n\n_ships__WEBPACK_IMPORTED_MODULE_1__.shipArray.forEach(ship => {\n    (0,_ships__WEBPACK_IMPORTED_MODULE_1__.addShips)('computer', ship)\n});\n\nconst optionsArray = Array.from(options.children);\noptionsArray.forEach(optionShip => optionShip.addEventListener('dragstart', _drag__WEBPACK_IMPORTED_MODULE_2__.dragStart));\n\n\nplayerBlocks.forEach(block => {\n    block.addEventListener('dragover', _drag__WEBPACK_IMPORTED_MODULE_2__.dragOver);\n    block.addEventListener('drop', _drag__WEBPACK_IMPORTED_MODULE_2__.dropShip);\n})\n\n\n//# sourceURL=webpack://project-battleship/./src/index.js?");

/***/ }),

/***/ "./src/ships.js":
/*!**********************!*\
  !*** ./src/ships.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Ship: () => (/* binding */ Ship),\n/* harmony export */   addShips: () => (/* binding */ addShips),\n/* harmony export */   angle: () => (/* binding */ angle),\n/* harmony export */   flipShips: () => (/* binding */ flipShips),\n/* harmony export */   notDropped: () => (/* binding */ notDropped),\n/* harmony export */   shipArray: () => (/* binding */ shipArray)\n/* harmony export */ });\n/* harmony import */ var _drag__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./drag */ \"./src/drag.js\");\n\n\nlet notDropped;\n\nlet angle = 0;\n\nclass Ship {\n    constructor(name, length) {\n        this.name = name;\n        this.length = length;\n    }\n}\n\n\nfunction flipShips() {\n    const ships = document.querySelector('.options');\n\n    const arrayShips = Array.from(ships.children)\n    \n    if(angle === 0) {\n        angle = 90;\n    } else {\n        angle = 0;\n    }\n\n    arrayShips.forEach(ship => {\n        ship.style.transform = `rotate(${angle}deg)`\n    });\n}\n\nfunction addShips(user, ship, startId) {\n    const computerBoard = document.querySelectorAll(`#${user} div`);\n\n    let randomBool = Math.random() < 0.5;\n    let isHorizontal = user === 'player' ? angle === 0 : randomBool;\n    let randomStart = Math.floor(Math.random() * 100);\n\n    let startIndex = startId ? startId : randomStart;\n    \n    const {shipBlocks, valid, notTaken} = (0,_drag__WEBPACK_IMPORTED_MODULE_0__.handleValidity)(computerBoard, isHorizontal, startIndex, ship)\n    \n    if(valid && notTaken) {\n        shipBlocks.forEach(shipBlock => {\n            shipBlock.classList.add(ship.name);\n            shipBlock.classList.add('taken');\n        })\n    } else {\n        if(user === 'computer') addShips(user, ship, startId);\n        if(user === 'player') notDropped = true;\n    }\n}\n\nconst destroyer = new Ship('destroyer', 2);\nconst submarine = new Ship('submarine', 3);\nconst cruiser = new Ship('cruiser', 3);\nconst battleship = new Ship('battleship', 4);\nconst carrier = new Ship('carrier', 5);\n\nconst shipArray = [destroyer, submarine, cruiser, battleship, carrier];\n\n//# sourceURL=webpack://project-battleship/./src/ships.js?");

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