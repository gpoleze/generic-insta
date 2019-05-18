import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';

import PubSub from 'pubsub-js';
import {PubSubChannel} from "../services/pubsub-channels";

import PhotoItem from './photo-box/components/PhotoItem';
import {get, post, isUserLogedin} from '../services/webapi';
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
        this._commentUpdatesHadler();
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

    _commentUpdatesHadler = () => {
        PubSub.subscribe(PubSubChannel.NEW_COMMENT_UPDATES, (topic, message) => {
            const targetedPhoto = this.state.photos.find(photo => photo.id === message.photoId);
            targetedPhoto.comentarios.push(message.comment);
            this.setState({photos: this.state.photos});
        })
    };

    _commentAction = (id, commentInput) => {
        post(
            `/fotos/${id}/comment`,
            {texto: commentInput.value},
            localStorage.getItem('auth-token')
        )
            .then(res => res.text())
            .then(JSON.parse)
            .then(comment => PubSub.publish(PubSubChannel.NEW_COMMENT_UPDATES, {photoId: id, comment}));

        commentInput.value = '';
    };

    like(id) {
        this.timelineLogic.like(id);
    };

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
                                commentAction={this._commentAction}
                                likeAction={this.like.bind(this)}
                            />)
                    }
                </ReactCSSTransitionGroup>
            </div>
        );
    }
}
