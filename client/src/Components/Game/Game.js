import React, { useEffect, useState } from "react";

import Board from "../Board/BoardLogic";
import MoveDirectory from "../MoveDirectory/MoveDirectory";
import Invitation from "../Modals/Invitation";
import { useUser } from "../../Context/UserProvider";
import { useGame } from "../../Context/GameProvider";
import { useSocket } from "../../Context/SocketProvider";

const Game = () => {
  const { hasJoined, setHasTurn, setPlayers, setPlayer } = useUser();
  const { setGameStarted, gameStarted, gameID, recordedMoves, setRecordedMoves }  = useGame();
  const { socket } = useSocket();

  const recordMove = (notation, player)  => {
    const moves = recordedMoves.map((moves) => [...moves]);
    if (player === 0) {
      moves.push([notation]);
    } else {
      moves[moves.length - 1].push(notation);
    }

    setRecordedMoves(moves);

    socket.emit("update_moves", {
      gameID
      , moves
    })

  }

  useEffect(() => {
    if (socket === null) return;
    socket.on("start_game", ({ turn, players, player }) => {
      setPlayers(players);
      setPlayer(player);
      setHasTurn(turn);
      setGameStarted(true);
    });

    socket.on("update_moves", ({ moves }) => {
      setRecordedMoves(moves)
    })

  }, [socket, setPlayers, setPlayer, setHasTurn, setGameStarted]);

  return (
    <React.Fragment>
      {hasJoined && !gameStarted && <Invitation />}
      <section className = "board-section">
          <Board recordMoves = {recordMove}/>
      </section>
      <section className = "directory-section">
          <MoveDirectory />
      </section>
    </React.Fragment>
  );
};

export default Game;
