import React, {Component} from 'react';
import {Link} from "react-router-dom";

export default class PhotoInfo extends Component {
    render() {
        const {photo} = this.props;
        const likers = [].concat(photo.likers);
        const lastLiker = likers.pop();

        return (
            <div className="foto-in fo">
                <div className="foto-info-likes">

                    {
                        likers.map(liker =>
                            <span key={`${photo.id}_${liker.userLogin}`}>
                                <Link to={`/timeline/${liker.userLogin}`}>
                                    {`${liker.userLogin}, `}
                                </Link>
                            </span>
                        )
                    }
                    {
                        lastLiker ? (
                            <span key={`${photo.id}_${lastLiker.userLogin}`}>
                                <Link to={`/timeline/${lastLiker.userLogin}`}>
                                    {`${lastLiker.userLogin} `}
                                </Link>
                            </span>) : null
                    }
                    <span> {photo.likers.length > 0 ? "liked" : "no likes"}</span>

                </div>

                <p className="foto-info-legenda">
                    <Link to={`/timeline/${photo.userLogin}`} className="foto-info-autor">{photo.userLogin} </Link>
                    {photo.comment}
                </p>

                <ul className="foto-info-comentarios">
                    {
                        photo.comments.map(comment =>
                            <li key={comment.id} className="comentario">
                                <Link className="foto-info-autor"
                                      to={`/timeline/${comment.userLogin}`}>{comment.userLogin}</Link>
                                {` ${comment.text}`}
                            </li>
                        )
                    }
                </ul>
            </div>
        );
    }
}
