import Piece from "./piece";

export default class Queen extends Piece {
  constructor(player, location) {
    super(player, location, "chess-queen", "queen");
  }

  appendDiagnolMoves = (pos, board, dx, dy, potentialMoves, player) => {
    for (let i = 1; i < 8; i++) {
      const row = pos[0] + i * dx;
      const col = pos[1] + i * dy;
      if (row < 8 && col < 8 && row >= 0 && col >= 0) {
        if (board[row][col] === null) {
          potentialMoves.push([row, col]);
        } else {
          if (board[row][col].player !== player) {
            potentialMoves.push([row, col]);
          }
          break;
        }
      }
    }
  };

  diagnolMoves = (board, potentialMoves) => {
    const directions = [1, -1];

    for (let dx of directions) {
      for (let dy of directions) {
        this.appendDiagnolMoves(
          this.location,
          board,
          dx,
          dy,
          potentialMoves,
          this.player
        );
      }
    }
  };

  straightMoves = (pos, board, potentialMoves, player) => {
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
            potentialMoves.push([r, c]);
          } else {
            if (board[r][c].player !== player) {
              potentialMoves.push([r, c]);
            }
            break;
          }
        }
      }
    }
  };

  moves = (board) => {
    const potentialMoves = [];
    this.diagnolMoves(board, potentialMoves);
    this.straightMoves(board, potentialMoves);
    return potentialMoves;
  };
}
