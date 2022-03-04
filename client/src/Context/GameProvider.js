import { useContext, createContext, useState } from "react";
// import { useLocalStorage } from "../Hooks/useLocalStorage";

const GameContext = createContext();

export const useGame = () => {
  return useContext(GameContext);
};

const GameProvider = (props) => {
  // const [gameID, setGameID] = useState("game-id", "");
  // const [gameStarted, setGameStarted] = useState("game-started", false);
  const [gameID, setGameID] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [recordedMoves, setRecordedMoves] = useState([]);
  const [whiteFallenPieces, setWhiteFallenPieces] = useState([]);
  const [blackFallenPieces, setBlackFallenPieces] = useState([]);

  return (
    <GameContext.Provider
      value={{
        gameID,
        setGameID,
        recordedMoves,
        gameStarted,
        setGameStarted,
        setRecordedMoves,
        whiteFallenPieces,
        setWhiteFallenPieces,
        blackFallenPieces,
        setBlackFallenPieces
      }}
    >
      {props.children}
    </GameContext.Provider>
  );
};

export default GameProvider;
