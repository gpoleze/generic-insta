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
