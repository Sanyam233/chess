import Piece from './Piece';

class Queen extends Piece {
  constructor(isWhite, pos) {
    super(isWhite, pos, 'chess-queen');
  }

  getMoves(board) {
    const DIRECTIONS = [
      [1, 0],
      [0, 1],
      [-1, 0],
      [0, -1],
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

export default Queen;
