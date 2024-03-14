import Position from './Position';
import { PieceFactory, PIECES } from './PieceFactory';

class BoardCL {
  constructor() {
    this.board = this.initializeChessBoard();
  }

  initializeChessBoard() {
    const chessBoard = Array(8)
      .fill()
      .map((_) => Array(8).fill(null));

    for (const piece of PIECES) {
      chessBoard[piece[1]][piece[2]] = PieceFactory.createPiece(
        piece[0],
        true,
        new Position(piece[1], piece[2])
      );
      chessBoard[7 - piece[1]][piece[2]] = PieceFactory.createPiece(
        piece[0],
        false,
        new Position(piece[1], piece[2])
      );
    }
    return chessBoard;
  }

  getPiece(pos) {
    for (const piece of this.board) {
      if (pos.x === piece.x && pos.y === piece.y) return piece;
    }
    return null;
  }
}

export default BoardCL;
