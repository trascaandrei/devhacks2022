import { Router } from 'express';

export abstract class Routes {
    protected _router = Router();

    constructor() {
        if (this.constructor === Routes) {
            throw new Error('Abstract class \'Routes\' can\'t be instantiated');
        }
    }

    public getRouter(): Router {
        return this._router;
    }

    protected init(): void {
        throw new Error('Abstract method has no implementation');
    }
};
