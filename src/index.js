import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom'

import './css/reset.css';
import './css/timeline.css';
import './css/login.css';

import App from './App';
import Login from "./components/Login";
import Logout from "./components/Logout";
import {Provider} from "react-redux";
import {store} from "./stores/store";

const navigateToTimeline = (nextState, replace) => {

    const {match} = nextState;
    const privateTimelineAddress = !!match && match.isExact && !match.params.login;

    if (!privateTimelineAddress || !!localStorage.getItem('auth-token'))
        return <App login={match.params.login}/>;

    return <Redirect to='/?msg=Not able to login'/>;
};

ReactDOM.render((
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Login}/>
                <Route path='/timeline/:login?' render={navigateToTimeline}/>
                <Route path='/logout' component={Logout}/>
            </Switch>
        </BrowserRouter>
    </Provider>
), document.getElementById('root'));
