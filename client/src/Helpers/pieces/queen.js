import Piece from './piece';


export default class Queen extends Piece {

    constructor(player, location) {
        super(player, location, "chess-bishop");
    }

    appendDiagnolMoves = (pos, board, dx, dy, indexes, player) => {
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
    }
      
    diagnolMoves = (board, indexes) => {
        const directions = [1, -1];
      
        for (let dx of directions) {
          for (let dy of directions) {
            appendDiagnolMoves(this.location, board, dx, dy, indexes, this.player);
          }
        }
    } 

    straightMoves = (pos, board, indexes, player) => {
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
    }

    moves = (board, indexes) => {
        diagnolMoves(location[0], location[1], board, indexes, this.player);
        straightMoves(location[0], location[1], board, indexes, this.player);
    }
      


}