import Piece from './piece';


export default class Pawn extends Piece {

    constructor(player, location) {
        super(player, location, "chess-pawn");
    }

    moves = (board, indexes) => {
        let d = player === 0 ? 1 : -1;
        let row = player === 0 ? 1 : 6;
      
        if (board[this.location[0] + d][this.location[1]] === null) {
          indexes.push([this.location[0] + d, this.location[1]]);
      
          if (this.location[0] === row && board[this.location[0] + 2 * d][this.location[1]] === null) {
            indexes.push([this.location[0] + 2 * d, this.location[1]]);
          }
        }
      
        if (board[this.location[0] + d][this.location[1] - 1] && board[this.location[0] + d][this.location[1] - 1].player != this.player) {
          indexes.push([this.location[0] + d, this.location[1] - 1]);
        }
      
        if (board[this.location[0] + d][this.location[1] + 1] && board[this.location[0] + d][this.location[1] + 1] != this.player) {
          indexes.push([this.location[0] + d, this.location[1] + 1]);
        }
      }
      
}