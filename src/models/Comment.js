export class Comment {
    constructor(id, userLogin, text){
        /** @type{number} */
        this._id = id;

        /** @type{string} */
        this._userLogin = userLogin;

        /** @type{string} */
        this._text = text;
    }


    /** @returns {string} */
    get userLogin() {
        return this._userLogin;
    }

    /** @returns {string} */
    get text() {
        return this._text;
    }

    /** @returns {number} */
    get id() {
        return this._id;
    }
}
