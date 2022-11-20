import { RequestHandler } from "express";
import { Routes } from './routes';
import { AuthController } from '../controllers/auth_controller';
import { ApiCaller } from "../core/ApiCaller";

export class AuthRoutes extends Routes {
    private _apiCaller: ApiCaller;

    constructor (apiCaller: ApiCaller) {
        super();
        this._apiCaller = apiCaller;
        this.init();
    }

    protected init(): void {
        /* auth controller */
        const authController: AuthController = new AuthController(this._apiCaller);
        const signupFunc: RequestHandler = authController.signup.bind(authController);
        const loginFunc: RequestHandler = authController.login.bind(authController);

        this._router.post('/signup', signupFunc);

        this._router.post('/login', loginFunc);
    }
};
