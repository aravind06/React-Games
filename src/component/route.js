import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Homepage';
import CategoryItem from './CategoryItems';
import Login from "./Login";

export const RoutePath = (<Switch>
    <Route path="/" exact  ><Login /></Route>
    <Route path="/home" ><Home /></Route>
    <Route path="/search"><CategoryItem /></Route>
</Switch>);