import {observable, action, runInAction, computed, decorate} from "mobx";
import axios from "axios";

export class User {
    email = "";
    uid = "";
    accessToken = "";
    expiry = "";
    client = "";
}

decorate(User, {
    email: observable,
    uid: observable,
    accessToken: observable,
    expiry: observable,
    client: observable,
});

export class AuthStore {

    constructor(rootStore) {
        this.rootStore = rootStore;
        const user = localStorage.getItem('auth');
        if (user) {
            const {accessToken, email, uid, expiry, client} = JSON.parse(user);
            this.user.accessToken = accessToken;
            this.user.uid = uid;
            this.user.email = email;
            this.user.expiry = expiry;
            this.user.client = client;
            this.authenticated = true;
            this.validateToken();
        }
    }

    authenticated = false;
    user = new User();

    login({email, password}) {
        return this.authenticate(email, password);
    }

    logout() {
        return this.signout();
    }

    updateAuthToken(token) {
        this.user.accessToken = token;
        localStorage.setItem('auth', JSON.stringify(this.user));
    }

    authenticate(email, password) {
        return axios.post('/auth/sign_in', {email, password}).then(response => {
            const uid = response.headers['uid'];
            const client = response.headers['client'];
            const accessToken = response.headers['access-token'];
            const expiry = response.headers['expiry'];
            runInAction('loginSuccess', () => {
                this.user.email = email;
                this.user.uid = uid;
                this.user.accessToken = accessToken;
                this.user.client = client;
                this.user.expiry = expiry;
                this.authenticated = true;
                localStorage.setItem('auth', JSON.stringify(this.user));
            });
        });
    }

    validateToken() {
        return axios.get('/auth/validate_token', {
            headers: this.requestHeaders
        }).then((response) => {
            if (response.headers["access-token"]) {
                this.updateAuthToken(response.headers["access-token"]);
            }
            console.log('token is valid');
            this.authenticated = true;
        }).catch(() => {
            console.warn('token is NOT valid');
            this.authenticated = false;
        })
    }

    signout() {
        return axios.delete('/auth/sign_out', {
            headers: this.requestHeaders
        }).then(response => {
            console.log('signed out');
            this.user = new User();
            this.authenticated = false;
        }).catch(error => {
            console.log('could not sign out', error);
        })
    }

    get requestHeaders() {
        return {
            'access-token': this.user.accessToken,
            'client': this.user.client,
            'uid': this.user.uid
        }
    }
}
decorate(AuthStore, {
    authenticated: observable,
    user: observable,
    login: action,
    logout: action,
    updateAuthToken: action,
    requestHeaders: computed,
});
