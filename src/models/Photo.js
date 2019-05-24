import {HeaderInfo} from "./PhotoItemHeader";
import {Liker} from "./Liker";
import {Comment} from "./Comment";
import {loggedInUser} from "../services/webapi";

export class Photo {
    constructor(apiReturn) {

        this.id = apiReturn.id;
        this.comment = apiReturn.comentario || apiReturn.comment;

        if (apiReturn.comentarios)
            this.comments = apiReturn.comentarios.map(comment => new Comment(comment.id, comment.login, comment.texto));
        else
            this.comments = apiReturn.comments.map(comment => new Comment(comment.id, comment.userLogin, comment.text));

        this.hasLike = apiReturn.likeada || apiReturn.haslike;

        this.likers = apiReturn.likers.map(liker => new Liker(liker.login || liker.userLogin));
        this.hasLikeByLoggedInUser = apiReturn.likers.map(liker => liker.login).includes(loggedInUser());
        this.photoUrl = apiReturn.urlFoto || apiReturn.photoUrl;
        this.userLogin = apiReturn.loginUsuario || apiReturn.userLogin;
        this.headerInfo = new HeaderInfo(
            apiReturn.loginUsuario || apiReturn.userLogin,
            apiReturn.urlPerfil || apiReturn.profilePhotoUrl,
            apiReturn.horario || apiReturn.date);

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

    update(updateObject) {
        for (let key in updateObject) {
            if (!this.hasOwnProperty(key))
                throw new Error("Photo foes not have the property " + key);

            if (key === 'comments') {
                this[key] = updateObject.comments.map(comment => new Comment(comment.id, comment.userLogin, comment.text));
                continue;
            }

            if (key === 'liker') {
                this[key] = updateObject.likers.map(liker => new Liker(liker.userLogin));
                continue;
            }

            if (key === 'headerInfo') {
                this[key] = new HeaderInfo(
                    updateObject.headerInfo.userLogin,
                    updateObject.headerInfo.profilePhotoUrl,
                    updateObject.headerInfo.date);
                continue;
            }

            this[key] = updateObject[key];
        }
        return this;
    }
}


