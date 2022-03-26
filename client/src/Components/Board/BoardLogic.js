import React, { useEffect, useState, useCallback } from "react";

import initializeChessBoard from "../../Helpers/InitializeChessBoard";
import PlayAgain from "../Modals/PlayAgain";
import Promote from "../Modals/Promote";
import PawnPromotionAlert from "../Modals/PawnPromotionAlert";

import { useUser } from "../../Context/UserProvider";
import { useSocket } from "../../Context/SocketProvider";
import { useGame } from "../../Context/GameProvider";
import { canCastle } from "../../Helpers/moves";
import ChessBoard from "./ChessBoard";
import Queen from "../../Helpers/pieces/queen";
import Knight from "../../Helpers/pieces/knight";
import Bishop from "../../Helpers/pieces/bishop";
import Rook from "../../Helpers/pieces/rook";
import King from "../../Helpers/pieces/king";
import Pawn from "../../Helpers/pieces/pawn";

const BOARD = initializeChessBoard();

const BoardLogic = (props) => {
  const [board, setBoard] = useState(BOARD);
  const [selectedPiece, setSelectedPiece] = useState([]);
  const [moveSet, setMoveSet] = useState([]);
  const [showPromote, setShowPromote] = useState(false);
  const [pawnProStatus, setPawnProStatus] = useState(false);
  const [promotePieces, setPromotePieces] = useState([]);
  const [lastSelectedBlock, setLastSelectedBlock] = useState([]);
  const [winner, setWinner] = useState(null);
  const [showPlayAgain, setShowPlayAgain] = useState(false);

  const { players, hasTurn, setHasTurn, player, setPlayer, setPlayers } =
    useUser();
  const {
    gameID,
    whiteFallenPieces,
    setWhiteFallenPieces,
    blackFallenPieces,
    setBlackFallenPieces,
  } = useGame();
  const { socket } = useSocket();

  const getMoves = (pos) => {
    
    if (hasTurn) setLastSelectedBlock(pos);
    
    const r = pos[0],
      c = pos[1];

    if (!board[r][c] || board[r][c].player !== player || !hasTurn) {
      return;
    }
    const moves = board[r][c].moves(board);

    setMoveSet(moves);
    setSelectedPiece(pos);
  };

  const chessNotation = (to, isCastled) => {

    let notation = String.fromCharCode(97 + to[1]) + (to[0] + 1);

    if (isCastled) {
      notation = selectedPiece[1] < to[1] ? "O-O" : "O-O-O";
      return notation;
    }

    const pcs = board[selectedPiece[0]][selectedPiece[1]];
    const toPcs = board[to[0]][to[1]];

    //assign piece moved to the notation
    if (!(pcs instanceof Pawn)) {
      notation =
        `${pcs instanceof Knight ? "N" : pcs.type.charAt(0).toUpperCase()}${
          toPcs !== null ? "x" : ""
        }` + notation;
    } else {
      notation = `${toPcs !== null ? "x" : ""}` + notation;
    }

    return notation;
  };

  const isPotentialMove = (r, c) => {
    for (let i = 0; i < moveSet.length; i++) {
      if (moveSet[i][0] === r && moveSet[i][1] === c) {
        if (board[r][c] !== null) {
          return [true, true];
        }

        return [true, false];
      }
    }
    return [false, false];
  };

  const updateFallenPieces = useCallback(
    (capturedPiece) => {
      if (capturedPiece !== null) {
        if (capturedPiece.player === 0) {
          const newFallenPieces = [...whiteFallenPieces];
          newFallenPieces.push(capturedPiece);
          setWhiteFallenPieces(newFallenPieces);
        } else {
          const newFallenPieces = [...blackFallenPieces];
          newFallenPieces.push(capturedPiece);
          setBlackFallenPieces(newFallenPieces);
        }
      }
    },
    [
      setBlackFallenPieces,
      setWhiteFallenPieces,
      blackFallenPieces,
      whiteFallenPieces,
    ]
  );

  const canPromote = (to) => {
    return (
      board[selectedPiece[0]][selectedPiece[1]] instanceof Pawn &&
      (to[0] === 7 || to[0] === 0)
    );
  };

  const promotePawn = (piece) => {
    const updatedBoard = board.map((row) => [...row]);
    updatedBoard[lastSelectedBlock[0]][lastSelectedBlock[1]] = piece;
    piece.location = lastSelectedBlock;

    setBoard(updatedBoard);
    setShowPromote(false);
    setPromotePieces([]);

    emitPawnPromotion(lastSelectedBlock, piece.type);
  };

  const displayPawnPromotion = () => {
    setShowPromote(true);
    setPromotePieces([
      new Rook(player, lastSelectedBlock),
      new Bishop(player, lastSelectedBlock),
      new Knight(player, lastSelectedBlock),
      new Queen(player, lastSelectedBlock),
    ]);

  }

  const handleMove = (from, to) => {
    const updatedBoard = board.map((row) => [...row]);
    updatedBoard[to[0]][to[1]] = updatedBoard[from[0]][from[1]];
    updatedBoard[from[0]][from[1]] = null;
    return updatedBoard;
  };

  const performCastling = (from, to) => {
    //update king's position
    let updatedBoard = handleMove(from, to, board);

    //update rook's position
    if (from[1] < to[1]) {
      updatedBoard = handleMove([to[0], 7], [to[0], 5], updatedBoard);
    } else {
      updatedBoard = handleMove([to[0], 0], [to[0], 3], updatedBoard);
    }

    return updatedBoard;
  };

  const updateGameState = (to) => {
    let capturedPiece = null;
    let isCastled = false;
    let updatedBoard = null;

    //check if a piece is captured
    if (board[to[0]][to[1]] != null) {
      capturedPiece = board[to[0]][to[1]];
      updateFallenPieces(capturedPiece);

      if (canPromote(to)) {
        displayPawnPromotion();
        emitPawnPromotionDialogue();
      }

      //check for pawn promotion
    } else {
      //check castling and perform
      if (canCastle(updatedBoard, selectedPiece, to)) {
        updatedBoard = performCastling(selectedPiece, to);
        isCastled = true;
      }
    }

    if (updatedBoard === null) {
      updatedBoard = handleMove(selectedPiece, to);
    }

    //update piece's location
    board[selectedPiece[0]][selectedPiece[1]].location = to;

    //formulate the notation
    const notation = chessNotation(to, isCastled);
    props.recordMoves(notation, updatedBoard[to[0]][to[1]].player);

    setBoard(updatedBoard);
    setMoveSet([]);
    setSelectedPiece([]);
    setHasTurn(false);

    emitBoardUpdate(to);

    //check for winner
    if (capturedPiece && capturedPiece instanceof King) {
      setShowPlayAgain(true);
      setWinner(player + 1);

      emitWinnerUpdate();
    }
  };

  const resetBoard = () => {
    setBoard(initializeChessBoard());
    setMoveSet([]);
    setSelectedPiece(null);
    setShowPlayAgain(false);
    setWinner(null);
    setWhiteFallenPieces([]);
    setBlackFallenPieces([]);
  };

  //******* Emitters ********* */
  const emitBoardUpdate = (to) => {
    socket.emit("update_board", {
      gameID,
      from: selectedPiece,
      to: to,
    });
  };

  const emitBoardReset = () => {
    socket.emit("board_reset", {
      gameID,
      newPlayer1: players[player],
      newPlayer2: players[player === 0 ? 1 : 0],
    });
  };

  const emitWinnerUpdate = () => {
    socket.emit("game_over", { winner: player + 1, gameID });
  };

  const emitPawnPromotion = (to, pieceType) => {
    socket.emit("promote_pawn", {
      gameID,
      to,
      pieceType
    })
  }

  const emitPawnPromotionDialogue = () => {
    socket.emit("pawn_promotion_alert", {
      gameID
    })
  }

  useEffect(() => {
    if (!socket) return;
    socket.on("update_opponent_board", ({ from, to }) => {

      if (to.length !== 0) {
        const removePiece = board[to[0]][to[1]];
        updateFallenPieces(removePiece);
      }

      const updatedBoard = handleMove(from, to);
      setBoard(updatedBoard);
      setHasTurn(true);
    });

    socket.on("game_over", ({ winner }) => {
      setWinner(winner);
      setShowPlayAgain(true);
    });

    socket.on("board_reset", ({ player, hasTurn, players }) => {
      resetBoard();
      setHasTurn(hasTurn);
      setPlayer(player);
      setPlayers(players);
    });

    socket.on("promote_pawn", ({ to, pieceType }) => {

      let promotedPiece = null;
      const promotedPlayer = player === 0 ? 1 : 0;

      if (pieceType === "queen") {
        promotedPiece = new Queen(promotedPlayer, to);
      } else if (pieceType === "knight") {
        promotedPiece = new Knight(promotedPlayer, to);
      } else if (pieceType === "rook") {
        promotedPiece = new Rook(promotedPlayer, to);
      } else {
        promotedPiece = new Bishop(promotedPlayer, to);
      }

      const updatedBoard = board.map(row => [...row]);
      updatedBoard[to[0]][to[1]] = promotedPiece;
      setBoard(updatedBoard);
      setPawnProStatus(false);

    })

    socket.on("pawn_promotion_alert", () => {
      setPawnProStatus(true);
    })

    return () => {
      socket.off("update_opponent_board");
      socket.off("game_over");
      socket.off("board_reset");
      socket.off("promote_pawn");
    };
  }, [socket, board, updateFallenPieces, setBoard, setHasTurn]);

  return (
    <React.Fragment>
      {showPlayAgain && <PlayAgain onReset={emitBoardReset} winner={winner} />}
      {showPromote && <Promote pieces={promotePieces} onPromote={promotePawn} />}
      {pawnProStatus && <PawnPromotionAlert/>}

      <ChessBoard
        board={board}
        isPotentialMove={isPotentialMove}
        onBoardUpdate={updateGameState}
        getMoves={getMoves}
      />
    </React.Fragment>
  );
};

export default BoardLogic;
