export class Liker {
    constructor(userLogin) {
        /** @type{string} */
        this._userLogin = userLogin;
    }

    /** @returns {string} */
    get userLogin() {
        return this._userLogin;
    }
}
