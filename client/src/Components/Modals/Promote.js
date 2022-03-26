import { useState } from "react";

import Modal from "../UI/Modal/Modal";
import Piece from "../Piece/Piece";

const Promote = (props) => {

    const [pieceIdx, setPieceIdx] = useState(0);

    const selectPiece = (idx) => {
        setPieceIdx(idx)
    }

  return (
    <Modal>
      <h2>Take your pick</h2>
      <div className="promote-pieces">
        {props.pieces.map((piece, idx) => (
          <div className="promote-pieces-piece" onClick={() => selectPiece(idx)}>
            <Piece key={idx} piece={piece} promote />
            <p className= {`promote-pieces-piece-title ${idx === pieceIdx && "selected"}`}>{piece.type}</p>
          </div>
        ))}
      </div>
      <button className="button" onClick = {() => props.onPromote(props.pieces[pieceIdx])}>Pick</button>
    </Modal>
  );
};

export default Promote;
