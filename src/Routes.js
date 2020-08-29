import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./containers/Login";
import Cost from "./containers/Cost.jsx";

export default function Routes({changeAuthState,isAuthenticated}) {
    return (
        <Switch>
            <Route  path="/cost">
                <Cost isAuthenticated={isAuthenticated} changeAuthState={(newAuthState)=>changeAuthState(newAuthState)} />
            </Route>
            <Route path="/">
                <Login isAuthenticated={isAuthenticated} changeAuthState={(newAuthState)=>changeAuthState(newAuthState)} />
            </Route>
       

            
        </Switch>
    );
}