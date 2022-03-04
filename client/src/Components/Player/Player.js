import Piece from "../Piece/Piece";

const Player = (props) => {
    
    return (
    <div className="player">
      <div>
        <div className = "player-image"></div>
      </div>
      <div>
        <p className = "player-name">{props.playerName}</p>
        <div className="fallen-pieces">
          {props.pieces.map((piece, idx) => (
            <Piece key={idx} piece={piece} fallen/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Player;
