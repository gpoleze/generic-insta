import {HeaderInfo} from "./PhotoItemHeader";
import {Liker} from "./Liker";
import {Comment} from "./Comment";
import {loggedInUser} from "../../services/webapi";

export class Photo {
    constructor(apiReturn) {
        this._id = apiReturn.id;
        this._comment = apiReturn.comentario;
        this._comments = apiReturn.comentarios.map(comment => new Comment(comment.id, comment.login, comment.texto));
        this._hasLike = apiReturn.likeada;
        this._likers = apiReturn.likers.map(liker => new Liker(liker.login));
        this._hasLikeByLoggedInUser = apiReturn.likers.map(liker => liker.login).includes(loggedInUser());
        this._photoUrl = apiReturn.urlFoto;
        this._userLogin = apiReturn.loginUsuario;
        this._headerInfo = new HeaderInfo(apiReturn.loginUsuario, apiReturn.urlPerfil, apiReturn.horario);
    }

    get id() {
        return this._id;
    }

    get userLogin() {
        return this._userLogin;
    }

    get comment() {
        return this._comment;
    }

    /** @returns {Comment[]} */
    get comments() {
        return this._comments;
    }

    get hasLike() {
        return this._hasLike;
    }

    /** @returns {Liker[]} */
    get likers() {
        return this._likers;
    }

    /** @arg {Liker[]} */
    set likers(value) {
        this._likers = value;
    }

    get photoUrl() {
        return this._photoUrl;
    }

    get headerInfo() {
        return this._headerInfo;
    }

    get hasLikeByLoggedInUser() {
        return this._hasLikeByLoggedInUser;
    }

    set hasLikeByLoggedInUser(value) {
        this._hasLikeByLoggedInUser = value;
    }

    _parseDate(stringDate) {
        const numbers = stringDate.split(/[\/\s:]/).map(e => parseInt(e, 10));
        const year = numbers[2];
        const day = numbers[0];
        numbers[0] = year;
        numbers[2] = day;
        numbers[1] -= 1;

        return new Date(...numbers);
    }

}


