import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Piece = (props) => {
  return (
    <FontAwesomeIcon
      className={`piece ${props.piece.isWhite ? 'player-one' : 'player-two'} ${
        props.fallen && 'fallen'
      } ${props.promote && 'promote'}`}
      icon={props.piece.icon}
    />
  );
};

export default Piece;
