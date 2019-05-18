import React, {Component} from "react";

export default class PhotoUpdates extends Component {
    _like(event) {
        event.preventDefault();
        this.props.likeAction(this.props.photo.id);
    }

    _comment(event) {
        event.preventDefault();
        this.props.commentAction(this.props.photo.id, this.commentInput);
    }

    render() {
        return (
            <section className="fotoAtualizacoes">
                <a onClick={(e) => this._like(e)}
                   className={this.props.photo.hasLikeByLoggedInUser ? "fotoAtualizacoes-like" : "fotoAtualizacoes-like-ativo"}>
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
