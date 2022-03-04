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

  //[[rook, knight, bishop], [], []]

  //pawn initalization
  for (let i = 0; i < 8; i++) {
    chessBoard[1][i] = { player: 0, type: "pawn", icon: "chess-pawn" };
    chessBoard[6][i] = { player: 1, type: "pawn", icon: "chess-pawn" };;
  }

  //rook initialization
  chessBoard[0][0] = { player: 0, type: "rook", icon: "chess-rook" };
  chessBoard[0][7] = { player: 0, type: "rook", icon: "chess-rook" };
  chessBoard[7][0] = { player: 1, type: "rook", icon: "chess-rook" };
  chessBoard[7][7] = { player: 1, type: "rook", icon: "chess-rook" };

  //bishop initialization
  chessBoard[0][2] = { player: 0, type: "bishop", icon: "chess-bishop" }
  chessBoard[0][5] = { player: 0, type: "bishop", icon: "chess-bishop" }
  chessBoard[7][2] = { player: 1, type: "bishop", icon: "chess-bishop" };
  chessBoard[7][5] = { player: 1, type: "bishop", icon: "chess-bishop" };

  //knight initialization
  chessBoard[0][1] = { player: 0, type: "knight", icon: "chess-knight" };
  chessBoard[0][6] = { player: 0, type: "knight", icon: "chess-knight" };
  chessBoard[7][1] =  { player: 1, type: "knight", icon: "chess-knight" };
  chessBoard[7][6] =  { player: 1, type: "knight", icon: "chess-knight" };

  //queen initialization
  chessBoard[0][3] =  { player: 0, type: "queen", icon: "chess-queen" };
  chessBoard[7][3] = { player: 1, type: "queen", icon: "chess-queen" };

  //king initialization
  chessBoard[0][4] = { player: 0, type: "king", icon: "chess-king" }
  chessBoard[7][4] = { player: 1, type: "king", icon: "chess-king" };

  return chessBoard;
};

export default initializeChessBoard;
