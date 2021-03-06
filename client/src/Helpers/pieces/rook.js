import Piece from "./piece";

export default class Rook extends Piece {
  constructor(player, location) {
    super(player, location, "chess-rook", "rook");
  }

  moves = (board) => {
    const potentialMoves = [];
    const rowMoves = [0, 0, 1, -1];
    const colMoves = [1, -1, 0, 0];

    for (let i = 0; i < 4; i++) {
      let r = this.location[0];
      let c = this.location[1];
      for (let j = 0; j < 8; j++) {
        r += rowMoves[i];
        c += colMoves[i];
        if (r >= 0 && c >= 0 && r < 8 && c < 8) {
          if (board[r][c] === null) {
            potentialMoves.push([r, c]);
          } else {
            if (board[r][c].player !== this.player) {
              potentialMoves.push([r, c]);
            }
            break;
          }
        }
      }
    }
    return potentialMoves;
  };
}
