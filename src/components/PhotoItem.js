import React, {Component} from 'react';
import {Photo} from "./Photo";
import {Link} from "react-router-dom";

class PhotoUpdates extends Component {
    render() {
        return (
            <section className="fotoAtualizacoes">
                <a href="#" className="fotoAtualizacoes-like">Like</a>
                <form className="fotoAtualizacoes-form">
                    <input type="text" placeholder="Adicione um comentário..." className="fotoAtualizacoes-form-campo"/>
                    <input type="submit" value="Comentar!" className="fotoAtualizacoes-form-submit"/>
                </form>

            </section>
        );
    }
}

class PhotoInfo extends Component {
    render() {
        const {likers, comment, comments, author} = this.props;
        return (
            <div className="foto-in fo">
                <div className="foto-info-likes">

                    {
                        likers.map(liker =>
                            <div>
                                <Link key={liker.id} to={`/timeline/${liker.nome}`}>
                                    {liker.nome}
                                </Link>
                                {likers.size > 0 ? <span> ,</span> : <span></span>}
                            </div>
                        )
                    }

                    {likers.size > 0 ? "liked" : "no likes"}

                </div>

                <p className="foto-info-legenda">
                    <Link to={`/timeline/${author}`} className="foto-info-autor">{author} </Link>
                    {comment}
                </p>

                <ul className="foto-info-comentarios">
                    {
                        comments.map(comment =>
                            <li key={comment.id} className="comentario">
                                <Link className="foto-info-autor">{comment.login} to={`/timeline/${comment.login}`}</Link>
                                {comment.texto}
                            </li>
                        )
                    }
                </ul>
            </div>
        );
    }
}

class PhotoHeader extends Component {
    render() {
        const {info} = this.props;

        return (
            <header className="foto-header">
                <figure className="foto-usuario">
                    <img src={info.profilePhotoUrl} alt="foto do usuario"/>
                    <figcaption className="foto-usuario">
                        <Link to={`/timeline/${info.userLogin}`}>
                            {info.userLogin}
                        </Link>
                    </figcaption>
                </figure>
                <time className="foto-data">{info.date}</time>
            </header>
        );
    }
}

export default class PhotoItem extends Component {
    render() {
        const photo = new Photo(this.props.photo);

        return (
            <div className="foto">
                <PhotoHeader info={photo.headerInfo}/>
                <img alt="foto" className="foto-src" src={photo.photoUrl}/>
                <PhotoInfo author={photo.userLogin} likers={photo.likers} comment={photo.comment}
                           comments={photo.comments}/>
                <PhotoUpdates/>
            </div>
        );
    }
}
