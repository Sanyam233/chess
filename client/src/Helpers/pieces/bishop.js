import Piece from "./piece";

export default class Bishop extends Piece {
  constructor(player, location) {
    super(player, location, "chess-bishop", "bishop");
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

  moves = (board) => {
    const directions = [1, -1];

    const potentialMoves = [];

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

    return potentialMoves;
  };
}
