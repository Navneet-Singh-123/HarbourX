import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import HomePage from "./components/pages/Home";
import Profile from './components/pages/Profile';

const App = () => {
  return (
    <Router>
      <Fragment>
        <Navbar />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/profile" component={Profile} />
        </Switch>
      </Fragment>
    </Router>
  );
};

export default App;
