import Piece from "./piece";

export default class Knight extends Piece {
  constructor(player, location) {
    super(player, location, "chess-knight", "knight");
  }

  moves = (board) => {
    const potentialMoves = [];
    for (let i = -2; i < 3; i++) {
      for (let j = -2; j < 3; j++) {
        if (Math.pow(i, 2) + Math.pow(j, 2) === 5) {
          const r = this.location[0] + i;
          const c = this.location[1] + j;
          if (
            r >= 0 &&
            c >= 0 &&
            r < 8 &&
            c < 8 &&
            (board[r][c] === null || board[r][c].player !== this.player)
          ) {
            potentialMoves.push([r, c]);
          }
        }
      }
    }

    return potentialMoves;
  };
}
