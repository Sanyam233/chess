const appendDiagnolMoves = (pos, board, dx, dy, indexes, player) => {
  for (let i = 1; i < 8; i++) {
    const row = pos[0] + i * dx;
    const col = pos[1] + i * dy;
    if (row < 8 && col < 8 && row >= 0 && col >= 0) {
      if (board[row][col] === null) {
        indexes.push([row, col]);
      } else {
        if (board[row][col].player !== player) {
          indexes.push([row, col]);
        }
        break;
      }
    }
  }
};

export const bishopMoves = (pos, board, indexes, player) => {
  const directions = [1, -1];

  for (let dx of directions) {
    for (let dy of directions) {
      appendDiagnolMoves(pos, board, dx, dy, indexes, player);
    }
  }
};

export const rookMoves = (pos, board, indexes, player) => {
  const rowMoves = [0, 0, 1, -1];
  const colMoves = [1, -1, 0, 0];

  for (let i = 0; i < 4; i++) {
    let r = pos[0];
    let c = pos[1];
    for (let j = 0; j < 8; j++) {
      r += rowMoves[i];
      c += colMoves[i];
      if (r >= 0 && c >= 0 && r < 8 && c < 8) {
        if (board[r][c] === null) {
          indexes.push([r, c]);
        } else {
          if (board[r][c].player !== player) {
            indexes.push([r, c]);
          }
          break;
        }
      }
    }
  }
};

export const canCastle = (board, from, to) => {
  const xMoves = from[1] - to[1];
  const yMoves = from[0] - to[0];
  let dx = 1;

  if (Math.abs(xMoves) !== 2 || yMoves !== 0) return false;
  if (from[1] > to[1]) dx = -1;

  for (let step = 1; step < 3; step++) {
    if (board[from[0]][from[1] + step * dx] !== null) return false;
  }

  const rookYLoc = dx === 1 ? 7 : 0;

  return board[from[0]][rookYLoc].type === "rook";
};

export const kingMoves = (pos, board, indexes, player) => {
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      const r = pos[0] + i;
      const c = pos[1] + j;
      if (
        r >= 0 &&
        c >= 0 &&
        r < 8 &&
        c < 8 &&
        (board[r][c] === null || board[r][c].player !== player)
      ) {
        indexes.push([r, c]);
      }
    }
  }

  //castling
  if (canCastle(board, pos, [pos[0], 6])) {
    indexes.push([pos[0], 6]);
  }

  if (canCastle(board, pos, [pos[0], 2])) {
    indexes.push([pos[0], 2]);
  }
};

export const knightMoves = (pos, board, indexes, player) => {
  for (let i = -2; i < 3; i++) {
    for (let j = -2; j < 3; j++) {
      if (Math.pow(i, 2) + Math.pow(j, 2) === 5) {
        const r = pos[0] + i;
        const c = pos[1] + j;
        if (
          r >= 0 &&
          c >= 0 &&
          r < 8 &&
          c < 8 &&
          (board[r][c] === null || board[r][c].player !== player)
        ) {
          indexes.push([r, c]);
        }
      }
    }
  }
};

export const pawnMoves = (pos, board, indexes, player) => {
  let d = player === 0 ? 1 : -1;
  let row = player === 0 ? 1 : 6;

  if (board[pos[0] + d][pos[1]] === null) {
    indexes.push([pos[0] + d, pos[1]]);

    if (pos[0] === row && board[pos[0] + 2 * d][pos[1]] === null) {
      indexes.push([pos[0] + 2 * d, pos[1]]);
    }
  }

  if (board[pos[0] + d][pos[1] - 1] && board[pos[0] + d][pos[1] - 1].player != player) {
    indexes.push([pos[0] + d, pos[1] - 1]);
  }

  if (board[pos[0] + d][pos[1] + 1] && board[pos[0] + d][pos[1] + 1].player != player) {
    indexes.push([pos[0] + d, pos[1] + 1]);
  }
};

export const queenMoves = (row, col, board, indexes, player) => {
  bishopMoves(row, col, board, indexes, player);
  rookMoves(row, col, board, indexes, player);
};
