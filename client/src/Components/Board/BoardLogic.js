import React, { useEffect, useState, useCallback } from "react";

import initializeChessBoard from "../../Helpers/InitializeChessBoard";
import PlayAgain from "../Modals/PlayAgain";
import Promote from "../Modals/Promote";

import { useUser } from "../../Context/UserProvider";
import { useSocket } from "../../Context/SocketProvider";
import { useGame } from "../../Context/GameProvider";
import ChessBoard from "./ChessBoard";
import DummyObj  from "../../Helpers/dummyObject";
import {
  bishopMoves,
  rookMoves,
  queenMoves,
  kingMoves,
  pawnMoves,
  knightMoves,
  canCastle,
} from "../../Helpers/moves";

const BOARD = initializeChessBoard();

const obj = new DummyObj("hello");

const BoardLogic = (props) => {
  const [board, setBoard] = useState(BOARD);
  const [selectedPiece, setSelectedPiece] = useState([]);
  const [moveSet, setMoveSet] = useState([]);
  const [showPromote, setShowPromote] = useState(false);
  const [promotePieces, setPromotePieces] = useState([]);
  const [lastPosition, setLastPosition] = useState([]);
  const [winner, setWinner] = useState(null);
  const [showPlayAgain, setShowPlayAgain] = useState(false);

  const { players, hasTurn, setHasTurn, player, setPlayer, setPlayers } =
    useUser();
  const { gameID, whiteFallenPieces, setWhiteFallenPieces, blackFallenPieces, setBlackFallenPieces } = useGame();
  const { socket } = useSocket();

  const getMoves = (boardPiece, pos) => {
    console.log("turn", hasTurn);

    if (hasTurn) {
      setLastPosition(pos);
    }

    if (
      !board[pos[0]][pos[1]] ||
      board[pos[0]][pos[1]].player !== player ||
      !hasTurn
    ) {
      return;
    }

    const moves = [];

    if (boardPiece === "pawn") {
      pawnMoves(pos, board, moves, player);
    } else if (boardPiece === "rook") {
      rookMoves(pos, board, moves, player);
    } else if (boardPiece === "bishop") {
      bishopMoves(pos, board, moves, player);
    } else if (boardPiece === "queen") {
      queenMoves(pos, board, moves, player);
    } else if (boardPiece === "knight") {
      knightMoves(pos, board, moves, player);
    } else {
      kingMoves(pos, board, moves, player);
    }

    setMoveSet(moves);
    setSelectedPiece(pos);
  };

  const chessNotation = (from, to) => {
    let notation = String.fromCharCode(97 + to[1]) + (to[0] + 1);
    const pcs = board[from[0]][from[1]];
    const toPcs = board[to[0]][to[1]];

    //assign piece moved to the notation
    if (pcs.type !== "pawn") {
      notation =
        `${pcs.type === "knight" ? "N" : pcs.type.charAt(0).toUpperCase()}${
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
    (removePiece) => {
      if (removePiece !== null) {
        if (removePiece.player === 0) {
          const newFallenPieces = [...whiteFallenPieces];
          newFallenPieces.push(removePiece);
          setWhiteFallenPieces(newFallenPieces);
        } else {
          const newFallenPieces = [...blackFallenPieces];
          newFallenPieces.push(removePiece);
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

  const movePiece = useCallback((from, to, currentBoard) => {
    let updatedBoard = [...currentBoard];
    updatedBoard = updatedBoard.map((row) => [...row]);
    updatedBoard[to[0]][to[1]] = updatedBoard[from[0]][from[1]];
    updatedBoard[from[0]][from[1]] = null;
    return updatedBoard;
  }, []);

  const performCastling = useCallback(
    (from, to) => {
      //update king's position
      let updatedBoard = movePiece(from, to, board);

      //update rook's position
      if (from[1] < to[1]) {
        updatedBoard = movePiece([to[0], 7], [to[0], 5], updatedBoard);
      } else {
        updatedBoard = movePiece([to[0], 0], [to[0], 3], updatedBoard);
      }

      return updatedBoard;
    },
    [board, movePiece]
  );

  const emitWinnerUpdate = () => {
    setShowPlayAgain(true);
    setWinner(player + 1);
    socket.emit("game_over", { winner: player + 1, gameID });
  };

  const updateBoard = useCallback(
    (from, to) => {
      const removedPiece = board[to[0]][to[1]];
      updateFallenPieces(removedPiece);
      let updatedBoard = board;

      let notation = chessNotation(from, to);

      if (canCastle(updatedBoard, from, to)) {
        updatedBoard = performCastling(from, to);
        notation = from[1] < to[1] ? "O-O" : "O-O-O";
      } else {
        if (
          updatedBoard[from[0]][from[1]].type === "pawn" &&
          (to[0] === 7 || to[0] === 0)
        ) {
          setShowPromote(true);
          setPromotePieces([
            { player: player, type: "rook", icon: "chess-rook" },
            { player: player, type: "bishop", icon: "chess-bishop" },
            { player: player, type: "knight", icon: "chess-knight" },
            { player: player, type: "queen", icon: "chess-queen" },
          ]);
        }

        updatedBoard = movePiece(from, to, updatedBoard);
      }

      props.recordMoves(notation, updatedBoard[to[0]][to[1]].player)

      if (removedPiece && removedPiece.type === "king") {
        emitWinnerUpdate();
      }

      setBoard(updatedBoard);
      setMoveSet([]);
      setSelectedPiece([]);

      return updatedBoard;
    },
    [board, updateFallenPieces, movePiece, player, performCastling]
  );

  const emitBoardUpdate = (to) => {
    const updatedBoard = updateBoard(selectedPiece, to);
    setHasTurn(false);
    obj.printValue();
    socket.emit("update_board", {
      updatedBoard,
      gameID,
      obj,
      to: to,

    });
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

  const emitBoardReset = () => {
    socket.emit("board_reset", {
      gameID,
      newPlayer1: players[player],
      newPlayer2: players[player === 0 ? 1 : 0],
    });
  };

  const promotePawn = (piece) => {
    let updatedBoard = [...board];
    updatedBoard[lastPosition[0]][lastPosition[1]] = piece;
    setBoard(updatedBoard);
    setShowPromote(false);
    setPromotePieces([]);

    socket.emit("update_board", {
      updatedBoard,
      gameID,
      to: [],
    });
  };

  useEffect(() => {
    if (!socket) return;
    socket.on("update_opponent_board", ({ updatedBoard, to, newobj }) => {
      console.log(newobj);
      newobj.printValue();
      if (to.length !== 0) {
        const removePiece = board[to[0]][to[1]];
        updateFallenPieces(removePiece);
      }

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

    return () => {
      socket.off("update_opponent_board");
      socket.off("game_over");
    };
  }, [socket, board, updateFallenPieces, setBoard, setHasTurn]);

  return (
    <React.Fragment>
      {showPlayAgain && <PlayAgain onReset={emitBoardReset} winner={winner} />}
      {showPromote && (
        <Promote pieces={promotePieces} onPromote={promotePawn} />
      )}
      {/* <Player playerName={players[1]} pieces={whiteFallenPieces} /> */}
        <ChessBoard
          board={board}
          isPotentialMove={isPotentialMove}
          onBoardUpdate={emitBoardUpdate}
          getMoves={getMoves}
        />
      {/* <Player playerName={players[0]} pieces={blackFallenPieces} /> */}
    </React.Fragment>
  );
};

export default BoardLogic;
