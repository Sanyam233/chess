import Position from './Position';
import { PieceFactory, PIECES } from './PieceFactory';

const initializeChessBoard = () => {
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
      new Position(7 - piece[1], piece[2])
    );
  }
  return chessBoard;
};

export default initializeChessBoard;
