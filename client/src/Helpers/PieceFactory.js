import Pawn from './pieces/Pawn';
import Queen from './pieces/Queen';
import King from './pieces/King';
import Rook from './pieces/Rook';
import Knight from './pieces/Knight';
import Bishop from './pieces/Bishop';

class PieceType {
  static ROOK = 'rook';
  static Queen = 'queen';
  static KING = 'king';
  static PAWN = 'pawn';
  static BISHOP = 'bishop';
  static KNIGHT = 'knight';
}

const PIECES = [
  [PieceType.ROOK, 0, 0],
  [PieceType.KNIGHT, 0, 1],
  [PieceType.BISHOP, 0, 2],
  [PieceType.QUEEN, 0, 3],
  [PieceType.KING, 0, 4],
  [PieceType.BISHOP, 0, 5],
  [PieceType.KNIGHT, 0, 6],
  [PieceType.ROOK, 0, 7],
  [PieceType.PAWN, 1, 0],
  [PieceType.PAWN, 1, 1],
  [PieceType.PAWN, 1, 2],
  [PieceType.PAWN, 1, 3],
  [PieceType.PAWN, 1, 4],
  [PieceType.PAWN, 1, 5],
  [PieceType.PAWN, 1, 6],
  [PieceType.PAWN, 1, 7],
];

class PieceFactory {
  static createPiece(type, color, pos) {
    if (PieceType.PAWN === type) {
      return new Pawn(color, pos);
    } else if (PieceType.KNIGHT === type) {
      return new Knight(color, pos);
    } else if (PieceType.QUEEN === type) {
      return new Queen(color, pos);
    } else if (PieceType.KING === type) {
      return new King(color, pos);
    } else if (PieceType.ROOK === type) {
      return new Rook(color, pos);
    } else if (PieceType.BISHOP === type) {
      return new Bishop(color, pos);
    }
    return null;
  }
}

export { PieceType, PIECES, PieceFactory };
