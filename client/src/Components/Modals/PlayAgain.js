import Modal from "../UI/Modal/Modal";

const PlayAgain = (props) => {

    return (
        <Modal>
            <h1>Player {props.winner} won</h1>
            <button className = "button" onClick = {props.onReset}>Restart</button>            
        </Modal>
    );
}

export default PlayAgain;