import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { library } from "@fortawesome/fontawesome-svg-core";
import { BrowserRouter } from "react-router-dom";
import {
  faChessBishop,
  faChessKing,
  faChessPawn,
  faChessQueen,
  faChessRook,
  faChessKnight,
  faTimes
} from "@fortawesome/free-solid-svg-icons";

import UserProvider from "./Context/UserProvider";
import SocketProvider from "./Context/SocketProvider";
import GameProvider from "./Context/GameProvider";

library.add(
  faChessBishop,
  faChessKing,
  faChessPawn,
  faChessQueen,
  faChessRook,
  faChessKnight,
  faTimes
);

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <GameProvider>
      <SocketProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SocketProvider>
      </GameProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
