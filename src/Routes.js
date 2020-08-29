import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./containers/Login";
import Cost from "./containers/Cost";

export default function Routes() {
    return (
        <Switch>
            <Route exact path="/login">
                <Login />
            </Route>
            <Route exact path="/cost">
                <Cost />
            </Route>
        </Switch>
    );
}