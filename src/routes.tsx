import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import Menu from "./pages/menu"
import Lobby from "./pages/lobby";
import Game from "./pages/game";
import HowToPlay from "./pages/how-to-play";


const Routes: React.FC = (props) => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Menu} ></Route>
        <Route exact path="/lobby" component={Lobby} ></Route>
        <Route exact path="/game" component={Game} ></Route>
        <Route exact path="/htp" component={HowToPlay} ></Route>
      </Switch>
    </Router>
  );
}

export default Routes;
