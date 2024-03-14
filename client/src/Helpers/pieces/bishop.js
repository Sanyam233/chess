import Piece from './Piece';

class Bishop extends Piece {
  constructor(isWhite, pos) {
    super(isWhite, pos, 'chess-bishop');
  }

  getMoves(board) {
    const DIRECTIONS = [
      [1, 1],
      [1, -1],
      [-1, 1],
      [-1, -1],
    ];

    const moves = [];

    for (const move of DIRECTIONS) {
      moves.push(...super.beamMoves(board, move));
    }

    return moves;
  }
}

export default Bishop;
