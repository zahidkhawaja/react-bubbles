import React from "react";
import { Route, Redirect } from "react-router-dom";

export const PrivateRoute = ({ component: Component }) => {
    return (
    <Route render = {() => localStorage.getItem("token") ? <Component /> : <Redirect to = "/" />}/>
    );
};