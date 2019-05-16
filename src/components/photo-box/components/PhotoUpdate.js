import React, {Component} from "react";
import jwt_decode from 'jwt-decode'
import PubSub from "pubsub-js";

import {post} from '../../../services/webapi'
import {PubSubChannel} from "../../../services/pubsub-channels";

export default class PhotoUpdates extends Component {
    constructor(props) {
        super(props);
        this.state = {hasLoggedInUserLiked: this._resolveHasLoggedInUser(this.props.photo.likers)};
    }

    _resolveHasLoggedInUser(likers) {
        const decoded = jwt_decode(localStorage.getItem('auth-token'));
        return !!likers.find(liker => liker.login === decoded.sub);
    }

    _like(event) {

        event.preventDefault();

        const {id} = this.props.photo;

        post(
            `/fotos/${id}/like`,
            {},
            localStorage.getItem('auth-token')
        )
            .then(res => res.text())
            .then(JSON.parse)
            .then(liker => {
                this.setState({hasLoggedInUserLiked: !this.state.hasLoggedInUserLiked});
                PubSub.publish(PubSubChannel.LIKES_UPDATES, {photoId: id, liker})
            });
    }

    _comment(event) {
        event.preventDefault();
        this.props.commentAction(this.props.photo.id, this.commentInput);
    }


    render() {
        return (
            <section className="fotoAtualizacoes">
                <a onClick={(e) => this._like(e)}
                   className={this.state.hasLoggedInUserLiked ? "fotoAtualizacoes-like-ativo" : "fotoAtualizacoes-like"}>
                    Like
                </a>
                <form className="fotoAtualizacoes-form">
                    <input type="text"
                           placeholder="Adicione um comentário..."
                           className="fotoAtualizacoes-form-campo"
                           ref={input => this.commentInput = input}
                    />
                    <input type="submit"
                           value="Comentar!"
                           className="fotoAtualizacoes-form-submit"
                           onClick={this._comment.bind(this)}
                    />
                </form>

            </section>
        );
    }
}
