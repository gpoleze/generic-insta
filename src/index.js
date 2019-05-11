import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom'
// import registerServiceWorker from './registerServiceWorker';

import './css/reset.css';
import './css/timeline.css';
import './css/login.css';

import App from './App';
import Login from "./components/Login";
import Logout from "./components/Logout";

const hasAuthToken = (next, replace) => !!localStorage.getItem('auth-token');

ReactDOM.render((
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Login}/>;
                }}/>
                <Route path='/timeline' render={() => {
                    if (hasAuthToken())
                        return <App/>;
                    return <Redirect to='/?msg=Not able to login'/>
                }}/>
                <Route path='/logout' component={Logout} render={() => <Redirect to='/'/>}/>
            </Switch>
        </BrowserRouter>
    ), document.getElementById('root')
);

// registerServiceWorker();
