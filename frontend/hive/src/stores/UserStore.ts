import { makeObservable, observable, action, } from "mobx";
import { API_CONSTS, USER_TYPES } from "../utils/constants";

export interface IUser {
    name: string;
    type: string;
    accessToken: string;
    currentCredit: number;
    targetCredit: number;
}

export class UserStore {
    constructor() {
        makeObservable(this, {
            userData: observable,
            getUserData: observable,
            setUserData: action,
        });
    }

    public userData: IUser = {} as IUser;

    public setUserData = (userData: IUser) => {
        this.userData = userData;
    }

    public getUserData = () => {
        return JSON.parse(window.localStorage.getItem('userData') || '{}');
    }

    public setUserToken = (token: string) => {
        // TODO
    }

    public fetchUserData = async () => {
        // TODO
    }
}