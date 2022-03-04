import { useRef, useState } from "react";
import { v4 as uuid4 } from "uuid";

import { useHistory } from "react-router";
import { useUser } from "../../Context/UserProvider";
import { useSocket } from "../../Context/SocketProvider";
import { useGame } from "../../Context/GameProvider";

import Button from "../UI/Button/Button";
import Alert from "../UI/Alert/Alert";

const joinRoom = (socket, gameID, username) => {
  return new Promise((resolve, reject) => {
    socket.emit("join_room", { gameID, username });
    socket.on("room_joined", () => resolve(true));
    socket.on("join_room_error", ({ error }) => {
      reject(error);
    });
  });
};

const joinRoomCaller = async (socket, gameID, username) => {
  return await joinRoom(socket, gameID, username);
};

const Login = () => {
  const usernameRef = useRef();
  const gameIDRef = useRef();
  const [usernameIsInvalid, setUsernameIsInvalid] = useState(false);

  const history = useHistory();

  const [isNew, setIsNew] = useState(true);
  const { setUsername, setHasJoined } = useUser();
  const { setGameID } = useGame();
  const { socket } = useSocket();

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const enteredUsername = usernameRef.current.value;

    if (enteredUsername.trim().length < 3) {
      setUsernameIsInvalid(true);
      return;
    }

    const enteredGameID = gameIDRef.current && gameIDRef.current.value;
    const newGameID = enteredGameID || uuid4();
    const isInRoom = joinRoomCaller(socket, newGameID, enteredUsername);

    if (!isInRoom) return;

    setUsername(enteredUsername);
    setGameID(newGameID);
    setHasJoined(true);
    history.replace(`/${newGameID}`);
  };

  const switchLoginState = (event) => {
    event.preventDefault();
    setIsNew((prevIsNew) => !prevIsNew);
  };

  const dismissAlert = () => {
    setUsernameIsInvalid(false);
  }

  let switchText = isNew ? "Already have a game ID?" : "Donot have a game ID?";

  return (
    <section className = "login-section">
    {usernameIsInvalid && <Alert isError onDismiss = {dismissAlert}>
      Please enter a valid username of more than 3 letters
    </Alert>}
      <div className="login">
        <h2 className="login-header">Welcome to Chess Mania</h2>
        <form>
          <div className="login-input-field">
            <label className={usernameIsInvalid && "invalid-label"}>
              Username
            </label>
            <input
              placeholder="Enter a username"
              className={usernameIsInvalid && "invalid-input"}
              type="text"
              ref={usernameRef}
            />
          </div>
          {!isNew && (
            <div className="login-input-field">
              <label>Game ID</label>
              <input
                placeholder="Enter a game ID"
                type="text"
                ref={gameIDRef}
              />
            </div>
          )}
          <div className="flex-column-container">
            <Button onClick={onSubmitHandler}>
              {isNew ? "Start A Game" : "Join A Game"}
            </Button>
            <p className="login-switch">
              {switchText}{" "}
              <button
                className="login-switch-button"
                onClick={switchLoginState}
              >
                {isNew ? "Join" : "Create"}
              </button>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
