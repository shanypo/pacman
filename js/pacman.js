'use strict'
var gDirection;
const PACMAN ='<img class="pacman" src="img/pacman.png"/>';

var gPacman;
var gEtenGhost = [];
function createPacman(board) {
    gPacman = {
        location: {
            i: 3,
            j: 5
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}
function movePacman(ev) {
    if (!gGame.isOn) return;
    var nextLocation = getNextLocation(ev)
    if (!nextLocation) return;
    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    if (gPacman.isSuper && nextCell === POWER_FOOD) return; 
    
    nextCellOpt(nextCell);
    if (nextCell === WALL) return;
    if (nextCell === GHOST){
        if (!gPacman.isSuper) {
            gameOver();
            renderCell(gPacman.location, EMPTY);
            playSoundDeath();
        } else {
            gEtenGhost.push(getGhost(nextLocation));
        }
    }

    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
    // update the dom
    renderCell(gPacman.location, EMPTY);
    gPacman.location = nextLocation;
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
    // update the dom
    renderCell(gPacman.location, totateDirection());    
    if (isVictorios()) {
        console.log('you won!');
        var textModal = 'Victorious!';
        showModal(textModal);
    }    
}

function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard.code) {
        case 'ArrowUp':
            gDirection = 'up';
            nextLocation.i--;
            break;
        case 'ArrowDown':
            gDirection = 'down';
            nextLocation.i++;
            break;
        case 'ArrowLeft':
            gDirection = 'left';
            nextLocation.j--;
            break;
        case 'ArrowRight':
            gDirection = 'right';
            nextLocation.j++;
            break;
        default:
            return null;
    }
    return nextLocation;
}

function getGhost(nextCell) {
    for (var i = 0; i < gGhosts.length; i++) {
        if (gGhosts[i].location.i === nextCell.i && gGhosts[i].location.j === nextCell.j) {
            gBoard[gGhosts[i].location.i][gGhosts[i].location.j] = EMPTY;
            if (nextCell === POWER_FOOD){
                updateScore(1);
            }
            return gGhosts.splice(i, 1)[0];
        }
    }
}

function superMoodeActive() {
    gPacman.isSuper = true;
    setTimeout(superMoodeEnd, 5000);
}
function superMoodeEnd() {
    gPacman.isSuper = false;
    gGhosts = gGhosts.concat(gEtenGhost);
    gEtenGhost = [];
}
function nextCellOpt(nextCell) {
    switch (nextCell) {
        case CHERRY:
            updateScore(10);
            break;
        case FOOD:
            updateScore(1);
            break;
        case POWER_FOOD:
            superMoodeActive();
            break;
    }
    return;
}

function totateDirection(){
    return `<span class="pacman ${gDirection}">${PACMAN}</span>`;
}

