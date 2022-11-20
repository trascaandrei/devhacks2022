import { makeObservable, observable, action, } from "mobx";
import { API_CONSTS, USER_TYPES } from "../utils/constants";

export interface IUser {
    userId: string;
    userType: string;
}

export class UserStore {
    constructor() {
        makeObservable(this, {
            userData: observable,
        });
    }

    public userData: IUser = {
        userType: USER_TYPES.ngo,
    } as IUser;

    public setUserData = (userData: IUser) => {
        this.userData = userData;
    }

    public setUserToken = (token: string) => {
        // TODO
    }

    public fetchUserData = async () => {
        // TODO
    }
}