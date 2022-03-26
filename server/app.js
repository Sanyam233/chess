const express = require("express");
const http = require("http");
const socketio = require("socket.io");

const PORT = process.env.PORT || 5000;
const gamePlayers = new Map();

const app = express();
const server = http.createServer(app);

const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {

  socket.on("join_room", ({ gameID, username }) => {
    const connectedSockets = io.sockets.adapter.rooms.get(gameID);
    const rooms = Array.from(socket.rooms.values()).filter(
      (room) => room !== socket.id
    );

    const gameRoomPlayers = gamePlayers.get(gameID) || null;

    if (rooms.length > 0 || (connectedSockets && connectedSockets.size === 2)) {
      socket.emit("join_room_failed");
    } else {

      if (!gameRoomPlayers) {
        gamePlayers.set(gameID, [username]);
      } else {
        gameRoomPlayers.push(username);
        gamePlayers.set(gameID, gameRoomPlayers);
      }

      socket.join(gameID);
      socket.emit("room_joined");

      if (io.sockets.adapter.rooms.get(gameID).size === 2) {
        socket.emit("start_game", {
          turn: false,
          players: gamePlayers.get(gameID),
          player : 1
        });
        socket.broadcast
          .to(gameID)
          .emit("start_game", {
            turn: true,
            players: gamePlayers.get(gameID),
            player : 0
          });
      }
    }
  });

  socket.on("update_board", ( { gameID, from, to }) => {
    socket.broadcast.to(gameID).emit("update_opponent_board", { from, to });
  })

  socket.on("game_over", ( { winner, gameID } ) => {
    socket.broadcast.to(gameID).emit("game_over", { winner });
  })

  socket.on("board_reset", ( { gameID, newPlayer1, newPlayer2 } ) => {
    const players = [newPlayer1, newPlayer2];
    socket.broadcast.to(gameID).emit("board_reset", { player : 1, hasTurn : false, players});
    socket.emit("board_reset", { player : 0, hasTurn : true, players});
  })  

  socket.on("update_moves", ( {gameID, moves } ) => {
    socket.broadcast.to(gameID).emit("update_moves", { moves });
  })  

  socket.on("promote_pawn", ({ gameID, to, pieceType }) => {
    socket.broadcast.to(gameID).emit("promote_pawn", { to, pieceType });
  })

  socket.on("pawn_promotion_alert", ({ gameID }) => {
    socket.broadcast.to(gameID).emit("pawn_promotion_alert");
  })  

});

server.listen(PORT, () => {
  console.log(`Server at PORT ${PORT} has started`);
});
