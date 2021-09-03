import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './component/Homepage';

import Login from "./Login";
import './App.css';
import CategoryItem from './component/CategoryItems';
const App = () => {
    return (
        <Router>
            <div className="App">
                <div id="page-wrap">
                    <Switch>
                        <Route path="/" exact  ><Login /></Route>
                        <Route path="/home" ><Home /></Route>
                        <Route path="/search"><CategoryItem /></Route>
                    </Switch>
                </div>
            </div>
        </Router>
    );
};

export default App;