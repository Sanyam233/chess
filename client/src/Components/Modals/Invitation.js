import Modal from "../UI/Modal/Modal";
import Spinner from "../UI/Spinner/Spinner";
import { useGame } from "../../Context/GameProvider";

const Invitation = () => {

  const { gameID } = useGame();

  const copyToClipboard = () => {
    if (!navigator.clipboard) {
      const textField = document.createElement("textarea");
      textField.innerText = gameID;
      document.body.appendChild(textField);
      textField.select();
      document.execCommand("copy");
      textField.remove();
    } else {
      navigator.clipboard.writeText(gameID);
    }
  };

  return (
    <Modal>
      <h2 className="modal-heading">Game Guideline</h2>
      <p className="modal-para">
        Waiting for another user to join the room. Share{" "}
        {
          <span onClick={copyToClipboard} className="invitation-link">
            {gameID}
          </span>
        }{" "}
        with another player
      </p>
      <Spinner />
    </Modal>
  );
};

export default Invitation;
