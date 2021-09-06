import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { RoutePath } from './component/route';
import './App.css';
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer from "./reducer";

const store = createStore(rootReducer, applyMiddleware(thunk));

const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <div className="App">
                    <div id="page-wrap">
                        {RoutePath}
                    </div>
                </div>
            </Router>
        </Provider>
    );
};

export default App;