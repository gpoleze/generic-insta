import React, {Component} from 'react';
import Header from './components/Header';
import Timeline from './components/Timeline';
import TimelineLogic from "./components/logic/TimelineLogic";

const timelineLogic = new TimelineLogic();

class App extends Component {
    render() {
        return (
            <div id="root">
                <div className="main">
                    <Header timelineLogic={timelineLogic}/>
                    <Timeline login={this.props.login} timelineLogic={timelineLogic}/>
                </div>
            </div>
        );
    }
}

export default App;
