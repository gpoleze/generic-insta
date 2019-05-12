import React, {Component} from "react";
import {post} from '../../../services/webapi'

export default class PhotoUpdates extends Component {
    constructor(props) {
        super(props);
        this.state = {hasLike: this.props.photo.hasLike};
    }

    like(event) {

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
                this.setState({hasLike: !this.state.hasLike});
            });
    }

    render() {
        return (
            <section className="fotoAtualizacoes">
                <a onClick={(e)=>this.like(e)}
                   className={this.state.hasLike ? "fotoAtualizacoes-like-ativo" : "fotoAtualizacoes-like"}>Like</a>
                <form className="fotoAtualizacoes-form">
                    <input type="text" placeholder="Adicione um comentário..." className="fotoAtualizacoes-form-campo"/>
                    <input type="submit" value="Comentar!" className="fotoAtualizacoes-form-submit"/>
                </form>

            </section>
        );
    }
}
