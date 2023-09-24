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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   dragOver: () => (/* binding */ dragOver),\n/* harmony export */   dragStart: () => (/* binding */ dragStart),\n/* harmony export */   dropShip: () => (/* binding */ dropShip),\n/* harmony export */   handleValidity: () => (/* binding */ handleValidity),\n/* harmony export */   isDropped: () => (/* binding */ isDropped)\n/* harmony export */ });\n/* harmony import */ var _ships__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ships */ \"./src/ships.js\");\n\n\nlet draggedShip;\n\nlet isDropped;\n\nfunction dragStart(e) {\n    draggedShip = e.target;\n    isDropped = false\n}\n\nfunction dragOver(e) {\n    e.preventDefault();\n    \n    const ship = _ships__WEBPACK_IMPORTED_MODULE_0__.shipArray[draggedShip.id];\n    highlight(e.target.id, ship)\n}\n\nfunction dropShip(e) {\n    console.log(e.target);\n    \n    const startId = e.target.id;\n    const ship = _ships__WEBPACK_IMPORTED_MODULE_0__.shipArray[draggedShip.id];\n    \n    (0,_ships__WEBPACK_IMPORTED_MODULE_0__.addShips)('player', ship, startId);\n    \n    if(!isDropped) {\n        draggedShip.remove();\n        draggedShip = '';\n    }\n}\n\nfunction handleValidity(computerBoard, isHorizontal, startIndex, ship) {\n    let validStart = isHorizontal ? startIndex <= 100 - ship.length ? startIndex : \n        100 - ship.length : \n        startIndex <= 100 - 10 * ship.length ? startIndex : \n            startIndex - ship.length * 10 + 10;\n\n    let shipBlocksArray = [];\n\n    for(let i = 0; i < ship.length; i++) {\n        if(isHorizontal) {\n            shipBlocksArray.push(computerBoard[Number(validStart) + i])\n        } else {\n            shipBlocksArray.push(computerBoard[Number(validStart) + i * 10])\n        }\n    }\n\n    let valid;\n    \n    if(isHorizontal) {\n        valid = shipBlocksArray.every((_shipBlock, index) =>\n            shipBlocksArray[0].id % 10 !== 10 - (shipBlocksArray.length - (index + 1)));\n    } else {\n        valid = shipBlocksArray.every((_shipBlock, index) => \n            shipBlocksArray[0].id < 90 + (10 * index + 1));\n    }\n\n    const notTaken = shipBlocksArray.every(shipBlock => !shipBlock.classList.contains('taken'));\n    \n    return {shipBlocksArray, valid, notTaken};\n}\n\nfunction highlight(startIndex, ship) {\n    const boardBlocks = document.querySelectorAll('#player div');\n\n    let isHorizontal = _ships__WEBPACK_IMPORTED_MODULE_0__.angle === 0;\n\n    const {shipBlocksArray, valid, notTaken} = handleValidity(boardBlocks, isHorizontal, startIndex, ship);\n\n    if(valid && notTaken) {\n        shipBlocksArray.forEach(highlight => {\n            highlight.classList.add('hover');\n            setTimeout(() => highlight.classList.remove('hover'), 400);\n        })\n    }\n}\n\n//# sourceURL=webpack://project-battleship/./src/drag.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   startGame: () => (/* binding */ startGame)\n/* harmony export */ });\nconst shipContainer = document.querySelector('.options');\nconst infoDisplay = document.getElementById('info-disply');\nconst turnDisplay = document.getElementById('turn-display');\n\nlet gameOver = false;\nlet playerTurn;\n\nfunction startGame() {\n\n    if(playerTurn === undefined) {\n        if(shipContainer.children.length != 0) {\n            infoDisplay.textContent = 'Infos: Place down all the ships first!';\n        } else {\n            const computerAllBlocks = document.querySelectorAll(\"#computer div\");\n            computerAllBlocks.forEach(block => block.addEventListener('click', handleClick));\n            playerTurn = true;\n            infoDisplay.textContent = 'Infos: The game has started!';\n            turnDisplay.textContent = 'Turn: Your turn.';\n        }\n    }\n}\n\nlet playerHits = [];\nlet computerHits = [];\nconst playerSunkShips = [];\nconst computerSunkShips = [];\n\nfunction handleClick(e) {\n    if(!gameOver) {\n        if(e.target.classList.contains('boom') || e.target.classList.contains('empty')) {\n            infoDisplay.textContent = 'Infos: We already hit that spot!';\n            return;\n        } else if(e.target.classList.contains('taken')) {\n            e.target.classList.add('boom');\n            infoDisplay.textContent = 'Infos: Enemy ship hit!';\n            let classes = Array.from(e.target.classList)\n            classes = classes.filter(className => className !== 'block');\n            classes = classes.filter(className => className !== 'boom');\n            classes = classes.filter(className => className !== 'taken');\n            classes = classes.filter(className => className !== 'cell');\n            playerHits.push(...classes);\n            checkScore('player', playerHits, playerSunkShips);\n        }\n\n        if(!e.target.classList.contains('taken')) {\n            infoDisplay.textContent = 'Infos: Target Missed.';\n            e.target.classList.add('empty');\n        }\n\n        playerTurn = false;\n\n        const allComputerBlocks = document.querySelectorAll('#computer div');\n        allComputerBlocks.forEach(block => block.replaceWith(block.cloneNode(true)));\n        setTimeout(computerTurn, 3000);\n    }\n}\n\n\nfunction computerTurn() {\n    if(!gameOver) {\n        infoDisplay.textContent = 'Infos: Computer\\'s thinking...';\n        turnDisplay.textContent = 'Turn: Computer\\'s Turn.';\n\n            let random = Math.floor(Math.random() * 10 * 10);  \n            const allPlayerBlocks = document.querySelectorAll('#player div');\n            if(allPlayerBlocks[random].classList.contains('boom') || allPlayerBlocks[random].classList.contains('empty')) {\n                computerTurn();\n                return;\n            } else if(allPlayerBlocks[random].classList.contains('taken') && !allPlayerBlocks[random].classList.contains('boom')) {\n                infoDisplay.textContent = 'Infos: Enemy hit us!';\n                allPlayerBlocks[random].classList.add('boom');\n                let classes = Array.from(allPlayerBlocks[random].classList)\n                classes = classes.filter(className => className !== 'block');\n                classes = classes.filter(className => className !== 'boom');\n                classes = classes.filter(className => className !== 'taken');\n                classes = classes.filter(className => className !== 'cell');\n                computerHits.push(...classes);\n                setTimeout(() => {\n                    computerTurn();\n                }, 2000);\n                checkScore('computer', computerHits, computerSunkShips);\n            } else {\n                infoDisplay.textContent = 'Infos: Enemy missed us!';\n                allPlayerBlocks[random].classList.add('empty');\n            }\n\n        setTimeout(() => {\n            playerTurn = true;\n            infoDisplay.textContent = 'Infos: Take aim!';\n            turnDisplay.textContent = 'Turn: Your Turn.';\n            const allComputerBlocks = document.querySelectorAll('#computer div');\n            allComputerBlocks.forEach(block => block.addEventListener('click', handleClick))\n        }, 2000);\n    }\n}\n\nfunction checkScore(user, hits, sunk) {\n\n    function checkShip(shipName, shipLength) {\n        if(hits.filter(storedShip => storedShip === shipName).length === shipLength) {\n            if(user === 'player') {\n                infoDisplay.textContent = `Infos: You sunk the enemy's ${shipName}!`;\n                playerHits = hits.filter(storedShip => storedShip !== shipName)\n            }\n            if(user === 'computer') {\n                infoDisplay.textContent = `Infos: The enemy sunk our ${shipName}!`;\n                computerHits = hits.filter(storedShip => storedShip !== shipName)\n            }\n            sunk.push(shipName)\n        }\n    }\n\n    checkShip('destroyer', 2);\n    checkShip('submarine', 3);\n    checkShip('cruiser', 3);\n    checkShip('battleship', 4);\n    checkShip('carrier', 5);\n\n    if(playerSunkShips.length === 5) {\n        infoDisplay.textContent = 'Infos: You sunk all the enemy\\'s ships, you won!!';\n        gameOver = true;\n    }\n    if(computerSunkShips === 5) {\n        infoDisplay.textContent = 'Infos: The enemy sunk all our ships, we lost..';\n        gameOver = true;\n    }\n}\n\n\n\n\n\n//# sourceURL=webpack://project-battleship/./src/game.js?");

/***/ }),

/***/ "./src/gameBoard.js":
/*!**************************!*\
  !*** ./src/gameBoard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Gameboard)\n/* harmony export */ });\nconst boardContainer = document.getElementById('board-container');\n\nclass Gameboard {\n    constructor(size) {\n        this.size = size;\n    }\n\n    createBoard(user) {\n        \n        const width = this.size * this.size;\n\n        const board = document.createElement('div');\n        board.classList.add('grid');\n        board.id = user;\n\n        for(let i = 0; i < width; i++) {\n            const cell = document.createElement('div');\n            cell.classList.add('cell');\n            cell.id = i;\n            board.append(cell);\n        }\n\n        boardContainer.append(board)\n    }\n}\n\n\n//# sourceURL=webpack://project-battleship/./src/gameBoard.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _gameBoard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameBoard */ \"./src/gameBoard.js\");\n/* harmony import */ var _ships__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ships */ \"./src/ships.js\");\n/* harmony import */ var _drag__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./drag */ \"./src/drag.js\");\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\n\n\n\n\nconst board = new _gameBoard__WEBPACK_IMPORTED_MODULE_0__[\"default\"](10)\nboard.createBoard('player')\nboard.createBoard('computer');\n\nconst startBtn = document.querySelector('#start-button');\nconst flipBtn = document.getElementById('flip-button');\nconst playerBlocks = document.querySelectorAll('#player div');\nconst options = document.querySelector('.options');\n\nflipBtn.addEventListener('click', _ships__WEBPACK_IMPORTED_MODULE_1__.flipShips);\n\n_ships__WEBPACK_IMPORTED_MODULE_1__.shipArray.forEach(ship => {\n    (0,_ships__WEBPACK_IMPORTED_MODULE_1__.addShips)('computer', ship);\n});\n\nconst optionsArray = Array.from(options.children);\noptionsArray.forEach(optionShip => optionShip.addEventListener('dragstart', _drag__WEBPACK_IMPORTED_MODULE_2__.dragStart));\n\nplayerBlocks.forEach(block => {\n    block.addEventListener('dragover', _drag__WEBPACK_IMPORTED_MODULE_2__.dragOver);\n    block.addEventListener('drop', _drag__WEBPACK_IMPORTED_MODULE_2__.dropShip);\n})\n\nstartBtn.addEventListener('click', _game__WEBPACK_IMPORTED_MODULE_3__.startGame);\n\n//# sourceURL=webpack://project-battleship/./src/index.js?");

/***/ }),

/***/ "./src/ships.js":
/*!**********************!*\
  !*** ./src/ships.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   CreateShip: () => (/* binding */ CreateShip),\n/* harmony export */   addShips: () => (/* binding */ addShips),\n/* harmony export */   angle: () => (/* binding */ angle),\n/* harmony export */   flipShips: () => (/* binding */ flipShips),\n/* harmony export */   isDroppedShip: () => (/* binding */ isDroppedShip),\n/* harmony export */   shipArray: () => (/* binding */ shipArray)\n/* harmony export */ });\n/* harmony import */ var _drag__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./drag */ \"./src/drag.js\");\n\n\nlet angle = 0;\n\nlet isDroppedShip;\n\nclass CreateShip {\n    constructor(name, length) {\n        this.name = name;\n        this.length = length;\n    }\n}\n\nfunction flipShips() {\n    const ships = document.querySelector('.options');\n\n    const arrayShips = Array.from(ships.children)\n    \n    if(angle === 0) {\n        angle = 90;\n    } else {\n        angle = 0;\n    }\n\n    arrayShips.forEach(ship => {\n        ship.style.transform = `rotate(${angle}deg)`\n    });\n}\n\nfunction addShips(user, ship, startId) {\n\n    const computerBoard = document.querySelectorAll(`#${user} div`);\n\n    \n    let randomBool = Math.random() < 0.5;\n    let isHorizontal = user === 'player' ? angle === 0 : randomBool;\n    let randomStart = Math.floor(Math.random() * 100);\n    \n    let startIndex = startId ? startId : randomStart;\n    \n    const {shipBlocksArray, valid, notTaken} = (0,_drag__WEBPACK_IMPORTED_MODULE_0__.handleValidity)(computerBoard, isHorizontal, startIndex, ship)\n\n    \n    if(valid && notTaken) {\n        shipBlocksArray.forEach(shipBlock => {\n            shipBlock.classList.add(ship.name); \n            shipBlock.classList.add('taken');\n        }) \n    } else {\n        if(user === 'computer') {addShips('computer', ship, startId)}\n        if(user === 'player') _drag__WEBPACK_IMPORTED_MODULE_0__.isDropped = true;\n    }\n}\n\nconst destroyer = new CreateShip('destroyer', 2);\nconst submarine = new CreateShip('submarine', 3);\nconst cruiser = new CreateShip('cruiser', 3);\nconst battleship = new CreateShip('battleship', 4);\nconst carrier = new CreateShip('carrier', 5);\n\nconst shipArray = [destroyer, submarine, cruiser, battleship, carrier];\n\n\n//# sourceURL=webpack://project-battleship/./src/ships.js?");

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