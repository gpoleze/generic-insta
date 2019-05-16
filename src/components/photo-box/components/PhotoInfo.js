import React, {Component} from 'react';
import {Link} from "react-router-dom";
import PubSub from "pubsub-js";

import {PubSubChannel} from "../../../services/pubsub-channels";

export default class PhotoInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {likers: this.props.photo.likers}
    }

    componentWillMount() {
        this._likeUpdatesHadler();
    }

    _likeUpdatesHadler() {
        PubSub.subscribe(PubSubChannel.LIKES_UPDATES, (topic, message) => {

            if (this.props.photo.id !== message.photoId)
                return;

            const isIn = this.state.likers.find(liker => liker.login === message.liker.login);

            let newLikers;
            if (isIn)
                newLikers = this.state.likers.filter(liker => liker.login !== message.liker.login);
            else
                newLikers = this.state.likers.concat(message.liker);

            this.setState({likers: newLikers});

        })
    }

    render() {
        const {photo} = this.props;
        const {comment} = photo;
        const likers = [].concat(this.state.likers);
        const lastLiker = likers.pop();

        return (
            <div className="foto-in fo">
                <div className="foto-info-likes">

                    {
                        likers.map(liker =>
                            <span key={`${this.props.photo.id}_${liker.login}`}>
                                <Link to={`/timeline/${liker.login}`}>
                                    {`${liker.login}, `}
                                </Link>
                            </span>
                        )
                    }
                    {
                        lastLiker ? (
                            <span key={`${this.props.photo.id}_${lastLiker.login}`}>
                                <Link to={`/timeline/${lastLiker.login}`}>
                                    {`${lastLiker.login} `}
                                </Link>
                            </span>) : null
                    }
                    <span> {this.state.likers.length > 0 ? "liked" : "no likes"}</span>

                </div>

                <p className="foto-info-legenda">
                    <Link to={`/timeline/${photo.userLogin}`} className="foto-info-autor">{photo.userLogin} </Link>
                    {comment}
                </p>

                <ul className="foto-info-comentarios">
                    {
                        photo.comments.map(comment =>
                            <li key={comment.id} className="comentario">
                                <Link className="foto-info-autor"
                                      to={`/timeline/${comment.login}`}>{comment.login}</Link>
                                {` ${comment.texto}`}
                            </li>
                        )
                    }
                </ul>
            </div>
        );
    }
}
