const Position = require('../Position');

class Piece {
  constructor(isWhite, pos, icon) {
    this.isWhite = isWhite;
    this.pos = pos;
    this.isKilled = false;
    this.icon = icon;
  }

  checkMove(board, incrementX, incrementY, isThreaten, isPawn = false) {
    const potentialRow = this.pos.x + incrementX;
    const potentialCol = this.pos.y + incrementY;

    //check if the move is within the board
    if (
      potentialRow < 0 ||
      potentialRow >= 8 ||
      potentialCol < 0 ||
      potentialCol >= 8
    )
      return false;

    //get the board box
    const piece = board[potentialRow][potentialCol];

    //pawn: piece is null && isThreaten is false
    //knight: piece is null ||

    if (isPawn && !piece && isThreaten) return false;
    if (!piece) return true;
    return piece.isWhite !== this.isWhite && isThreaten;
  }

  beamMoves = (board, move) => {
    const moves = [];
    let potentialRow = this.pos.x + move[0];
    let potentialCol = this.pos.y + move[1];

    while (
      potentialRow < 8 &&
      potentialRow >= 0 &&
      potentialCol < 8 &&
      potentialCol >= 0
    ) {
      const piece = board[potentialRow][potentialCol];
      if (!piece) {
        moves.push(new Position(potentialRow, potentialCol));
        continue;
      }

      if (piece.isWhite !== this.isWhite) {
        moves.push(new Position(potentialRow, potentialCol));
      }
      potentialRow += move[0];
      potentialCol += move[1];
      break;
    }
  };
}

export default Piece;
