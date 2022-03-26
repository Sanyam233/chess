import { useGame } from "../../Context/GameProvider";

const Row = (props) => {
  const { num, move } = props;
  return (
    <li className="directory-row">
      <span>{num}.</span>
      <span>{move.length > 0 ? move[0] : ""}</span>
      <span>{move.length === 2 ? move[1] : ""}</span>
    </li>
  );
};

const MoveDirectory = () => {
  const { recordedMoves } = useGame();

  const Directory = recordedMoves.map((move, idx) => (
    <Row num={idx + 1} move={move} />
  ));

  return (
    <div className="move-directory-container">
      <ul className="move-directory">{Directory}</ul>
    </div>
  );
};

export default MoveDirectory;
