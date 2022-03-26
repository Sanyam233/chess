import Piece from './piece';


export default class King extends Piece {

    constructor(player, location) {
        super(player, location, "chess-king", "king");
    }

    canCastle = (board, from, to) => {
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
    }
      
    moves = (board) => {
      const potentialMoves = [];
        for (let i = -1; i < 2; i++) {
          for (let j = -1; j < 2; j++) {
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
      
        //castling
        if (this.canCastle(board, this.location, [this.location[0], 6])) {
          potentialMoves.push([this.location[0], 6]);
        }
      
        if (this.canCastle(board, this.location, [this.location[0], 2])) {
          potentialMoves.push([this.location[0], 2]);
        }
      
        return potentialMoves;
    }
      
}