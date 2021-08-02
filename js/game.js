'use strict'
const WALL = '❤️';
const FOOD = '.'
const EMPTY = ' ';
const POWER_FOOD = '🍟';
const CHERRY = '🍒';

var gIntervalCherry;
var gFoodCount;
var gBoard;
var gGame = {
    score: 0,
    isOn: false
}
function init() {
    console.log('hello')
    gFoodCount = 0;
    gBoard = buildBoard();
    createPacman(gBoard);
    createGhosts(gBoard);
    printMat(gBoard, '.board-container');
    gGame.isOn = true;
    playSound();
    gIntervalCherry = setInterval(intervalCherry, 15000);
    hideModal();
}
function buildBoard() {
    var SIZE = 15;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            gFoodCount++;
            if (i === 1 && j === 1 || j === 1 && i === SIZE - 2
                || j === SIZE - 2 && i === 1
                || i === SIZE - 2 && j === SIZE - 2) {
                board[i][j] = POWER_FOOD;
                gFoodCount--;
            }
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 8 && i > 3 && i < SIZE - 2)
                || j === 2 && i > 4 && i < 8
                || j === 6 && i > 8 && i < 12
                || i === 4 && j > 9 && j < 13
                || i === 12 && j > 1 && j < 6
                || i === 8 && j > 1 && j < 6
                || i === 4 && j > 2 && j < 7
                || i === 8 && j > 8 && j < 13
                || j === 12 && i > 3 && i < 9) {
                board[i][j] = WALL;
                gFoodCount--;
            }
        }
    }
    gFoodCount--;
    console.log('gfood count', gFoodCount);

    return board;
}

function updateScore(diff) {
    gGame.score += diff;
    if (diff === 1) gFoodCount--;
    console.log('gfood count', gFoodCount);

    document.querySelector('h2 span').innerText = gGame.score
}

function gameOver() {
    console.log('Game Over');
    gGame.isOn = false;
    clearInterval(gIntervalCherry);
    var textModal = 'Game over';
    showModal(textModal);
    clearInterval(gIntervalGhosts)
}

function hideModal() {
    var elModal = document.querySelector('.modal');
    elModal.style.display = 'none';
}

function showModal(textModal) {
    var elModal = document.querySelector('.modal');
    elModal.style.display = 'block';
    var elText = document.querySelector('.modal h2');
    elText.innerText = textModal;
}
function isVictorios() {
    return gFoodCount === 0;
}

function getEmptyCelss() {
    var emptyCells = [];
    for (var i = 1; i < gBoard.length - 1; i++) {
        for (var j = 1; j < gBoard[0].length - 1; j++) {
            if (gBoard[i][j] === EMPTY) {
                emptyCells.push({ i, j });
            }
        }
    }
    return emptyCells;
}

function getRandomCell() {
    var emptyCells = getEmptyCelss();
    var randomIdx = getRandomInt(0, emptyCells.length);
    var emptyCell = emptyCells[randomIdx];
    return emptyCell;
}

function intervalCherry() {
    // debugger
    var emptyCell = getRandomCell();
    gBoard[emptyCell.i][emptyCell.j] = CHERRY;
    renderCell(emptyCell, CHERRY);
}

function playSound() {
    var sound = new Audio("sound/pacman.mp3");
    sound.play();
}



