import React, {Component} from 'react';
import {Photo} from "./Photo";

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
        const likers = this.props.likers;
        const comment = this.props.comment;
        const comments = this.props.comments;
        const author = this.props.author;
        return (
            <div className="foto-in fo">
                <div className="foto-info-likes">

                    {
                        likers.map(liker =>
                            <div>
                                <a key={liker.id} href="#">
                                    {liker.nome}
                                </a>
                                {likers.size > 0 ? <span> ,</span> : <span></span>}
                            </div>
                        )
                    }

                    {likers.size > 0 ? "liked" : "no likes"}

                </div>

                <p className="foto-info-legenda">
                    <a className="foto-info-autor">{author} </a>
                    {comment}
                </p>

                <ul className="foto-info-comentarios">
                    {
                        comments.map(comment =>
                            <li key={comment.id} className="comentario">
                                <a className="foto-info-autor">{comment.login} </a>
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
        const info = this.props.info;

        return (
            <header className="foto-header">
                <figure className="foto-usuario">
                    <img src={info.profilePhotoUrl} alt="foto do usuario"/>
                    <figcaption className="foto-usuario">
                        <a href="#">
                            {info.userLogin}
                        </a>
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
