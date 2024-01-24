import React from "react";
import { Route, BrowserRouter as Router, Switch} from "react-router-dom";
import { Homepage, LoginForm } from "../../pages";

function Routes() {
  return (
    <Router>
        <Switch>
            <Route path="/login">
                <LoginForm />
            </Route>
            <Route path="/homepage">
                <Homepage />
            </Route>
        </Switch>
    </Router>
  );
}

export default Routes;
