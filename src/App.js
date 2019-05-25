import React, {Component} from 'react';
import PropTypes from "prop-types";

import Header from './components/Header';
import Timeline from './components/Timeline';

class App extends Component {
    static contentTypes = {
      store: PropTypes.object.isRequired
    };

    render() {
        return (
            <div id="root">
                <div className="main">
                    <Header/>
                    <Timeline login={this.props.login}/>
                </div>
            </div>
        );
    }
}

export default App
