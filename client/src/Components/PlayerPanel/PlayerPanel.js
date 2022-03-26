import { useGame } from "../../Context/GameProvider";
import { useUser } from "../../Context/UserProvider";
import Player from "./Player/Player";

const PlayerPanel = (props) => {
  const {
    whiteFallenPieces,
    blackFallenPieces,
  } = useGame();

  const {
    players
  } = useUser();

  return (
    <div className = "player-panel">
      <Player playerName={players[1]} pieces={whiteFallenPieces} />
        {props.children}
      <Player playerName={players[0]} pieces={blackFallenPieces} />
    </div>
  );
};

export default PlayerPanel;
