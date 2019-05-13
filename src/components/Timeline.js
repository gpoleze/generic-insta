import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';

import PubSub from 'pubsub-js';

import PhotoItem from './photo-box/components/PhotoItem';
import {get} from '../services/webapi'
import {PubSubChannel} from "../services/pubsub-channels";

export default class Timeline extends Component {
    constructor(props) {
        super(props);
        this.state = {photos: []};
        this.login = this.props.login;
    }

    componentDidMount() {
        this.loadPhotos(this.props);
    }

    componentWillMount() {
        PubSub.subscribe(PubSubChannel.TIMELINE, (topic, message) => {
            this.setState({photos: message.photos});
        })
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (this.login !== nextProps.login) {
            this.login = nextProps.login;
            this.loadPhotos();
        }
    }

    loadPhotos() {
        const login = this.login;
        const url = !!login ? `/public/fotos/${login}` : `/fotos?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`;
        get(url)
            .then(photos => this.setState({photos: photos}));
    }

    render() {
        return (
            <div className="fotos container">
                <ReactCSSTransitionGroup
                    transitionName="timeline"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}>
                    {
                        this.state.photos.map(photo => <PhotoItem key={photo.id} photo={photo}/>)
                    }
                </ReactCSSTransitionGroup>
            </div>
        );
    }
}
