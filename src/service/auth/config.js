export default class Config {

    constructor() {
        this._api_url = process.env.NODE_ENV === 'production'
            ? window.location.origin + '/sisfreq-api/'
            : 'http://localhost:8080/';

    }

    get api_url() {
        return this._api_url;
    }

    set api_url(value) {
        this._api_url = value;
    }
}