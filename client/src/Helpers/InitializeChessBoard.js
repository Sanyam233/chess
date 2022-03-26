
import Queen from "./pieces/queen";
import King from "./pieces/king";
import Pawn from "./pieces/pawn";
import Knight from "./pieces/knight";
import Rook from "./pieces/rook";
import Bishop from "./pieces/bishop"

const initializeChessBoard = () => {
  const chessBoard = [];

  //initializing
  for (let i = 0; i < 8; i++) {
    const row = [];
    for (let j = 0; j < 8; j++) {
      row.push(null);
    }

    chessBoard.push(row);
  }

  for (let i = 0; i < 8; i++) {
    chessBoard[1][i] = new Pawn(0, [1, i]);
    chessBoard[6][i] = new Pawn(1, [6, i]);
  }

  chessBoard[1][1] = null;
  chessBoard[5][1] = new Pawn(0, [5, 1]);

  //rook initialization
  chessBoard[0][0] = new Rook(0, [0, 0]);
  chessBoard[0][7] = new Rook(0, [0, 7]);
  chessBoard[7][0] = new Rook(1, [7, 0]);
  chessBoard[7][7] = new Rook(1, [7, 7]);

  //bishop initialization
  chessBoard[0][2] = new Bishop(0, [0, 2]);
  chessBoard[0][5] = new Bishop(0, [0, 5]);
  chessBoard[7][2] = new Bishop(1, [7, 2]);
  chessBoard[7][5] = new Bishop(1, [7, 5]);

  //knight initialization
  chessBoard[0][1] = new Knight(0, [0, 1]);
  chessBoard[0][6] = new Knight(0, [0, 6]);
  chessBoard[7][1] = new Knight(1, [7, 1]);
  chessBoard[7][6] = new Knight(1, [7, 6]);

  //queen initialization
  chessBoard[0][3] = new Queen(0, [0, 3]);
  chessBoard[7][3] = new Queen(1, [7, 3]);

  //king initialization
  chessBoard[0][4] = new King(0, [0, 4]);
  chessBoard[7][4] = new King(1, [7, 4]);

  return chessBoard;
};

export default initializeChessBoard;
