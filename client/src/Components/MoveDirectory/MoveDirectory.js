import { useGame } from "../../Context/GameProvider";
import { useUser } from "../../Context/UserProvider";
import Player from "../Player/Player";

const Row = (props) => {
  const { num, move } = props;
  return (
    <li className = "directory-row">
      <span>{num}.</span>
      <span>{move.length > 0 ? move[0] : ""}</span>
      <span>{move.length === 2 ? move[1] : ""}</span>
    </li>
  );
};

const MoveDirectory = () => {
  const {
    recordedMoves,
    whiteFallenPieces,
    blackFallenPieces,
  } = useGame();

  const {
    players
  } = useUser();

  const Directory = recordedMoves.map((move, idx) => (
    <Row num={idx + 1} move={move} />
  ));

  return (
    <div className = "side-panel">
      <Player playerName={players[1]} pieces={whiteFallenPieces} />
      <div className = "directory-container">
        <ul className = "directory">{Directory}</ul>
      </div>
      <Player playerName={players[0]} pieces={blackFallenPieces} />
    </div>
  );
};

export default MoveDirectory;
