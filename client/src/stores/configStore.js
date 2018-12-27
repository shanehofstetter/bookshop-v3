import {observable, action, computed, decorate} from "mobx";
import i18n, {AVAILABLE_LANGUAGES, DEFAULT_LANGUAGE} from "../i18n";

export class ConfigStore {

    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    _language = DEFAULT_LANGUAGE;
    sidebarVisible = false;
    mobile = false;

    get desktop() {
        return !this.mobile;
    }

    toggleSidebar() {
        this.sidebarVisible = !this.sidebarVisible;
    }

    get language() {
        return this._language;
    }

    set language(language) {
        language = language.replace(/-[a-zA-Z]{2}/, "");

        if (AVAILABLE_LANGUAGES.indexOf(language) < 0) {
            return;
        }
        if (language === this._language) {
            return;
        }

        this._language = language;
        i18n.changeLanguage(language)
    }

    changeHistory(history, location) {
        history.push(location.pathname.replace(/^\/[a-zA-Z0-9]+\//, `/${this._language}/`));
    }
}

decorate(ConfigStore, {
    _language: observable,
    sidebarVisible: observable,
    mobile: observable,
    desktop: computed,
    toggleSidebar: action,
});