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

/***/ "./src/gameBoard.js":
/*!**************************!*\
  !*** ./src/gameBoard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Gameboard)\n/* harmony export */ });\nconst gridId = document.getElementById('gridId');\nconst occupiedCells = new Set();\n\nclass Gameboard {\n    constructor(size) {\n        this.size = size;\n    }\n\n    createBoard() {\n        \n        for(let row = 0; row < this.size; row++) {\n            for(let col = 0; col < this.size; col++) {\n                const cell = document.createElement('div');\n                cell.classList.add('cell');\n                cell.setAttribute('data-row', row);\n                cell.setAttribute('data-col', col);\n                gridId.appendChild(cell);\n            }\n        }\n    }\n    \n    placeShip(row, col, length, isHorizontal) {\n        const newOccupiedCells = new Set(); // Temporarily store occupied cells for this ship\n      \n        for (let i = 0; i < length; i++) {\n            \n            const currentRow = isHorizontal ? row : row + i;\n            const currentCol = isHorizontal ? col + i : col;\n      \n            const cell = document.querySelector(`[data-row=\"${currentRow}\"][data-col=\"${currentCol}\"]`);\n            \n            if (occupiedCells.has(`${currentRow}-${currentCol}`)) {\n\n                console.log(\"Ship overlap detected!\");\n                return;\n            }\n      \n            newOccupiedCells.add(`${currentRow}-${currentCol}`);\n        }\n      \n        // If no overlap detected, add the new occupied cells to the main set\n        newOccupiedCells.forEach((cell) => occupiedCells.add(cell));\n      \n        // Place the ship on the board\n        for (const cell of newOccupiedCells) {\n            const [row, col] = cell.split(\"-\").map(Number);\n            const cellElement = document.querySelector(`[data-row=\"${row}\"][data-col=\"${col}\"]`);\n            cellElement.classList.add(\"ship\");\n        }\n    }\n    \n    coordinates() {\n        gridId.addEventListener('click', (e) => {\n\n            const clickedCell = e.target;\n            const row = parseInt(clickedCell.getAttribute('data-row'));\n            const col = parseInt(clickedCell.getAttribute('data-col'));\n            \n            if(!isNaN(row) && !isNaN(col)) {\n                this.placeShip(row, col, 4, false);\n            }\n        })\n    }\n}\n\n\n//# sourceURL=webpack://project-battleship/./src/gameBoard.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _gameBoard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameBoard */ \"./src/gameBoard.js\");\n\n\n\nconst board = new _gameBoard__WEBPACK_IMPORTED_MODULE_0__[\"default\"](10)\n\nboard.createBoard()\nboard.coordinates()\n\n//# sourceURL=webpack://project-battleship/./src/index.js?");

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