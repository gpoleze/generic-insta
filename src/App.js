import React, {Component} from 'react';
import Header from './components/Header';
import Timeline from './components/Timeline';
import TimelineStore from "./components/logic/TimelineStore";

const timelineStore = new TimelineStore();

class App extends Component {
    render() {
        return (
            <div id="root">
                <div className="main">
                    <Header store={timelineStore}/>
                    <Timeline login={this.props.login} store={timelineStore}/>
                </div>
            </div>
        );
    }
}

export default App;
