import { Route, Switch, Redirect } from "react-router-dom";

import "./styles/App.scss";
import Game from "./Components/Game/Game";
import Login from "./Components/Authentication/Login";
import { useUser } from "./Context/UserProvider";

function App() {
  const { hasJoined } = useUser();

  return (
    <main className="app">
      <Switch>
        {hasJoined && (
          <Route exact path="/:roomID">
            <Game />
          </Route>
        )}
        <Route path="/">
          <Login />
        </Route>
        <Redirect to="/" />
      </Switch>
    </main>
  );
}

export default App;
