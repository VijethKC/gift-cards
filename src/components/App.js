import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import HomePage from "./HomePage";
import NotFound from "./NotFound";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomePage}></Route>
        <Route exact path="/*" component={NotFound}></Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
