import { useContext, createContext, useState } from 'react';
// import { useLocalStorage } from "../Hooks/useLocalStorage";

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

const UserProvider = (props) => {
  const [username, setUsername] = useState('');
  const [hasJoined, setHasJoined] = useState(false);
  const [hasTurn, setHasTurn] = useState(false);
  const [players, setPlayers] = useState(['Player 1', 'Player 2']);
  const [player, setPlayer] = useState(0);

  const values = {
    username,
    setUsername,
    hasJoined,
    setHasJoined,
    hasTurn,
    setHasTurn,
    players,
    setPlayers,
    player,
    setPlayer,
  };

  return (
    <UserContext.Provider value={values}>{props.children}</UserContext.Provider>
  );
};

export default UserProvider;
