import React, {Component} from 'react';
import {Link} from "react-router-dom";

export default class PhotoInfo extends Component {
    render() {
        const likers = [].concat(this.props.photo.likers);
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
                    <span> {this.props.photo.likers.length > 0 ? "liked" : "no likes"}</span>

                </div>

                <p className="foto-info-legenda">
                    <Link to={`/timeline/${this.props.photo.userLogin}`} className="foto-info-autor">{this.props.photo.userLogin} </Link>
                    {this.props.photo.comment}
                </p>

                <ul className="foto-info-comentarios">
                    {
                        this.props.photo.comments.map(comment =>
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
