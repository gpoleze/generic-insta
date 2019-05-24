import React, {Component} from 'react';
import Header from './components/Header';
import Timeline from './components/Timeline';
import {applyMiddleware, createStore, combineReducers} from "redux";
import thunk from "redux-thunk";
import {timeline} from "./reducers/timeline";
import {notification} from "./reducers/notification";

const reducers = combineReducers({timeline, header: notification});
const store = createStore(reducers, applyMiddleware(thunk));

class App extends Component {
    render() {
        return (
            <div id="root">
                <div className="main">
                    <Header store={store}/>
                    <Timeline login={this.props.login} store={store}/>
                </div>
            </div>
        );
    }
}

export default App;
