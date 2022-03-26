import React, { useEffect, useState } from "react";

import Board from "../Board/BoardLogic";
import Invitation from "../Modals/Invitation";
import PlayerPanel from "../PlayerPanel/PlayerPanel"
import SidePanel from "../SidePanel/SidePanel";

import useWindowDimensions from "../../Hooks/useWindowDimensions";
import { useUser } from "../../Context/UserProvider";
import { useGame } from "../../Context/GameProvider";
import { useSocket } from "../../Context/SocketProvider";
import { TABLET_BREAKPOINT } from "../../Helpers/CONSTVARIABLES";

const Game = () => {
  const { hasJoined, setHasTurn, setPlayers, setPlayer } = useUser();
  const { setGameStarted, gameStarted, gameID, recordedMoves, setRecordedMoves }  = useGame();
  const { socket } = useSocket();
  const { height, width } = useWindowDimensions();
  const isMobile = width < TABLET_BREAKPOINT;


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
    <div className = "game-container">
      {hasJoined && !gameStarted && <Invitation />}
      <section className = "chess-board-section">
        {isMobile && <PlayerPanel>
            <Board recordMoves = {recordMove}/>
        </PlayerPanel>}
        {!isMobile && <Board recordMoves = {recordMove}/>}
      </section>
      { !isMobile && <section className = "side-panel-section">
        <SidePanel/>
      </section>}
    </div>
  );
};

export default Game;
