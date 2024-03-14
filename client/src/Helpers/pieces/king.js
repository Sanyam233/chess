import Piece from './Piece';
import Position from '../Position';

class King extends Piece {
  constructor(isWhite, pos) {
    super(isWhite, pos, 'chess-king');
    this.hasCastled = false;
  }

  getMoves(board) {
    const DIRECTIONS = [
      [1, 0],
      [0, 1],
      [-1, 0],
      [0, -1],
      [1, -1],
      [1, 1],
      [-1, 1],
      [-1, -1],
    ];

    const moves = [];

    for (const move of DIRECTIONS) {
      const incrementX = this.isWhite ? move[0] : -move[0],
        incrementY = move[1];
      const isPossible = super.checkMove(board, incrementX, incrementY, true);
      if (isPossible)
        moves.push(
          new Position(this.pos.x + incrementX, this.pos.y + incrementY)
        );
    }

    return moves;
  }
}

export default King;
