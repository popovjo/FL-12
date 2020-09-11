const cellWidth = 35;
const boardSize = 16;
const boardWidth = (boardSize + 1) * cellWidth;
const winSize = 4;

const boardNode = document.getElementById('board');
boardNode.style.width = boardWidth;
const blackChipInfo = document.getElementsByClassName('player black')[0];
const whiteChipInfo = document.getElementsByClassName('player white')[0];
const winnerInfo = document.getElementsByClassName('winner')[0];

let map = [];
let turn = 0;
let cell;

function renderBoard() {
  const board = document.createElement('canvas');
  let boardContext = board.getContext('2d');
  board.setAttribute('width', boardWidth);
  board.setAttribute('height', boardWidth);
  boardNode.appendChild(board);

  // линии на доске
  boardContext.beginPath();
  boardContext.lineWidth = "1.5";
  boardContext.strokeStyle = "#362113";

  for (let i = 0; i < boardSize; i++) {
    boardContext.moveTo(cellWidth * i + cellWidth, cellWidth);
    boardContext.lineTo(cellWidth * i + cellWidth, boardWidth - cellWidth);
    boardContext.moveTo(cellWidth, cellWidth * i + cellWidth);
    boardContext.lineTo(boardWidth - cellWidth, cellWidth * i + cellWidth);
  }

  boardContext.stroke();
}

function placeChips() {
  const chipsWrapper = document.createElement('div');
  chipsWrapper.setAttribute('class', 'items');
  boardNode.appendChild(chipsWrapper);

  for (let column = 0; column < boardSize; column++) {
    let chipsColumn = document.createElement('div');
    chipsWrapper.appendChild(chipsColumn);
    map[column] = [];

    for (let row = 0; row < boardSize; row++) {
      map[column][row] = 0;
      let chipCell = document.createElement('div');
      chipCell.setAttribute('class', 'cell');
      // координаты ячейки и чья фишка поставлена
      chipCell.cellProperties = {
        row: row,
        column: column,
        player: 0
      };
      chipsColumn.appendChild(chipCell);
      chipCell.addEventListener('click', cellClicked);
    }
  }
}

function cellClicked(event) {
  cell = event.target.cellProperties;

  if (map[cell.column][cell.row] === 0) {
    cell.player = turn++ % 2 ? 1 : 2;
    map[cell.column][cell.row] = cell.player;
    
    let playerColor = cell.player === 1 ? 'white' : 'black';
    event.target.setAttribute('class', `cell ${playerColor}`);
    if (playerColor === 'black') {
      whiteChipInfo.style["text-decoration"] = 'underline';
      blackChipInfo.style["text-decoration"] = 'none';
    } else {
      blackChipInfo.style["text-decoration"] = 'underline';
      whiteChipInfo.style["text-decoration"] = 'none';
    }
    let winner = playerWon();
    
    if (winner && winner !== 'draw') {
      let cells = document.getElementsByClassName('cell');
      winnerInfoText(true, playerColor);
      stopGame(cells);
      markWinnerChips(cells, winner);
    }
    if (winner === 'draw') {
      winnerInfoText(false);
    }
  }
}

function playerWon() {
  let items;

  function chipCheck(column, row, winMap) {
    if (map[column][row] === cell.player) {
      items++;
      winMap.push({ column: column, row: row, player: cell.player });
    }
  }

  function checkHorizontalLine() {
    items = 1;
    let winMap = [{ column: cell.column, row: cell.row, player: cell.player }];
    // проверить ряд влево от поставленной фишки
    let row = cell.row;
    let column = cell.column;
    while (map[column][row] === cell.player && row > 0) {
      row--;
      chipCheck(column, row, winMap);
    }
    // проверить ряд вправо от поставленной фишки
    row = cell.row;
    column = cell.column;
    while (map[column][row] === cell.player && row < boardSize - 1) {
      row++;
      chipCheck(column, row, winMap);
    }
    if (items >= winSize) {
      return winMap;
    }
    return false;
  }

  function checkVerticalLine() {
    items = 1;
    let winMap = [{ column: cell.column, row: cell.row, player: cell.player }];
    // проверить столбец вверх от поставленной фишки
    let row = cell.row;
    let column = cell.column;
    while (map[column][row] === cell.player && column > 0) {
      column--;
      chipCheck(column, row, winMap);
    }
    // проверить вниз от поставленной фишки
    row = cell.row;
    column = cell.column;
    while (map[column][row] === cell.player && column < boardSize - 1) {
      column++;
      chipCheck(column, row, winMap);
    }
    if (items >= winSize) {
      return winMap;
    }
    return false;
  }

  function checkFirstDiagonal() {
    items = 1;
    let winMap = [{ column: cell.column, row: cell.row, player: cell.player }];
    // проверить диагональ от поставленной фишки вверх-вправо
    let row = cell.row;
    let column = cell.column;
    while (map[column][row] === cell.player && column > 0 && row > 0) {
      column--;
      row++;
      chipCheck(column, row, winMap);
    }
    // проверить диагональ от поставленной фишки вниз-влево
    row = cell.row;
    column = cell.column;
    while (map[column][row] === cell.player && row < boardSize - 1 &&
      column < boardSize - 1) {
      column++;
      row--;
      chipCheck(column, row, winMap);
    }
    if (items >= winSize) {
      return winMap;
    }
    return false;
  }

  function checkSecondDiagonal() {
    items = 1;
    let winMap = [{ column: cell.column, row: cell.row, player: cell.player }];
    // проверить диагональ от поставленной фишки вверх-влево
    let row = cell.row;
    let column = cell.column;
    while (map[column][row] === cell.player && column > 0 && row > 0) {
      column--;
      row--;
      chipCheck(column, row, winMap);
    }
    // проверить диагональ от поставленной фишки вниз-вправо
    row = cell.row;
    column = cell.column;
    while (map[column][row] === cell.player && row < boardSize - 1 &&
      column < boardSize - 1) {
      column++;
      row++;
      chipCheck(column, row, winMap);
    }
    if (items >= winSize) {
      return winMap;
    }
    return false;
  }

  let winMap = (checkHorizontalLine() || checkVerticalLine() ||
    checkFirstDiagonal() || checkSecondDiagonal())

  if (winMap) {
    return winMap;
  }
  if (turn === boardSize ** 2 && !winMap) {
    return 'draw';
  }
  return false;
}

function stopGame(cells) {
  for (let cell of cells) {
    cell.removeEventListener('click', cellClicked);
  }
}

function markWinnerChips(cells, winnerCells) {
  for (let cell of cells) {
    for (let winCell of winnerCells) {
      if (compareCellProperties(cell.cellProperties, winCell)) {
            cell.setAttribute('class', 'cell cell-winner');
      }
    }
  }
}

function compareCellProperties(boardCell, winnerCell) {
  return (boardCell.row === winnerCell.row &&
    boardCell.column === winnerCell.column &&
    boardCell.player === winnerCell.player);
};

function winnerInfoText(win = true, playerColor) {
  winnerInfo.style.opacity = '1';
  if (win) {
    winnerInfo.textContent = `${playerColor} win!!!`;
  } else {
    winnerInfo.textContent = `Draw :(`;
    
  }
}


renderBoard();
placeChips();
