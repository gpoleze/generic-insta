export class HeaderInfo {
    constructor(userLogin, profilePhotoUrl, date) {
        this._userLogin = userLogin;
        this._profilePhotoUrl = profilePhotoUrl;
        this._date = date;
    }

    get userLogin() {
        return this._userLogin;
    }

    get profilePhotoUrl() {
        return this._profilePhotoUrl;
    }

    get date() {
        return this._date;
    }
}

export class Photo {
    constructor(apiReturn) {
        this._id = apiReturn._id;
        this._comment = apiReturn.comentario;
        this._comments = apiReturn.comentarios;
        this._likes = apiReturn.likeada;
        this._likers = apiReturn.likers;
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

    get comments() {
        return this._comments;
    }

    get likes() {
        return this._likes;
    }

    get likers() {
        return this._likers;
    }

    get photoUrl() {
        return this._photoUrl;
    }

    get headerInfo() {
        return this._headerInfo;
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


