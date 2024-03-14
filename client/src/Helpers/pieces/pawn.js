import Piece from './Piece';
import Position from '../Position';

class Pawn extends Piece {
  constructor(isWhite, pos) {
    super(isWhite, pos, 'chess-pawn');
    this.hasMoved = false;
  }

  getMoves(board) {
    const DIRECTIONS = [[1, 0]];
    const DIRECTIONS_INITIAL = [
      [1, 0],
      [2, 0],
    ];
    const THREATEN_MOVES = [
      [1, -1],
      [1, 1],
    ];
    const moves = [];

    const potentialMoves = this.hasMoved ? DIRECTIONS : DIRECTIONS_INITIAL;

    for (const move of potentialMoves) {
      const incrementX = this.isWhite ? move[0] : -move[0],
        incrementY = move[1];
      const isPossible = super.checkMove(
        board,
        incrementX,
        incrementY,
        false,
        true
      );
      if (isPossible)
        moves.push(
          new Position(this.pos.x + incrementX, this.pos.y + incrementY)
        );
    }

    for (const move of THREATEN_MOVES) {
      const incrementX = this.isWhite ? move[0] : -move[0],
        incrementY = move[1];
      const isPossible = super.checkMove(
        board,
        incrementX,
        incrementY,
        true,
        true
      );
      if (isPossible)
        moves.push(
          new Position(this.pos.x + incrementX, this.pos.y + incrementY)
        );
    }

    return moves;
  }

  move(pos) {
    this.hasMoved = true;
    super.move(pos);
  }
}

export default Pawn;
