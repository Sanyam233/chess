import Piece from '../../Piece/Piece';
const Square = (props) => {
  let tileColor = props.color ? 'light-brown' : 'dark-brown';
  let numberColor = !props.color ? 'light-brown' : 'dark-brown';

  const moves = () => {
    if (props.piece) {
      props.getMoves(props.pos);
    }

    if (props.isPotential) {
      props.updateGame(props.pos);
    }
  };

  return (
    <div className={`square ${tileColor}`} onClick={moves}>
      <span className={`square-text ${numberColor} top`}>{props.number}</span>
      {props.isPotential && (
        <div
          className={
            props.hasOtherPlayerPiece ? 'potential-contains-piece' : 'potential'
          }
        ></div>
      )}
      {props.piece && <Piece piece={props.piece} />}
      <span className={`square-text ${numberColor} bottom`}>{props.alpha}</span>
    </div>
  );
};

export default Square;
