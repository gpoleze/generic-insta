import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';

import PubSub from 'pubsub-js';
import {PubSubChannel} from "../services/pubsub-channels";

import PhotoItem from './photo-box/components/PhotoItem';
import {get, isUserLogedin} from '../services/webapi';
import TimelineLogic from "./logic/TimelineLogic";


export default class Timeline extends Component {
    constructor(props) {
        super(props);
        this.state = {photos: []};
        this.login = this.props.login;
        this.timelineLogic = new TimelineLogic([]);
    }

    componentDidMount() {
        this.loadPhotos(this.props);
        this._timelineUpdateHandler();
    }

    _timelineUpdateHandler = () => {
        PubSub.subscribe(PubSubChannel.TIMELINE, (topic, message) => {
            this.setState({photos: message.photos});
        });
    };

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
            .then(photos => photos.map(photo => {
                photo.hasLikeByLoggedInUser = isUserLogedin(photo.loginUsuario);
                return photo;
            }))
            .then(photos => {
                this.setState({photos: photos});
                this.timelineLogic = new TimelineLogic(photos)
            });
    }


    render() {
        return (
            <div className="fotos container">
                <ReactCSSTransitionGroup
                    transitionName="timeline"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}>
                    {
                        this.state.photos.map(photo =>
                            <PhotoItem
                                key={photo.id}
                                photo={photo}
                                commentAction={(id, commentInput) => this.timelineLogic.comment(id, commentInput)}
                                likeAction={(id) => this.timelineLogic.like(id)}
                            />)
                    }
                </ReactCSSTransitionGroup>
            </div>
        );
    }
}
