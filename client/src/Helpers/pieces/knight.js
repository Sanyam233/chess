import Piece from './Piece';
import Position from '../Position';

class Knight extends Piece {
  constructor(isWhite, pos) {
    super(isWhite, pos, 'chess-knight');
  }

  getMoves(board) {
    const DIRECTIONS = [
      [2, 1],
      [2, -1],
      [1, 2],
      [-1, 2],
      [-2, 1],
      [-2, -1],
      [1, -2],
      [-1, -2],
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

export default Knight;
