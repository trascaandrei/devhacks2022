import { RequestHandler } from "express";
import { Routes } from './routes';
import { ActionController } from '../controllers/action_controller';
import { AuthMiddleware } from '../middlewares/auth_middleware';

export class ActionRoutes extends Routes {
    constructor () {
        super();
        this.init();
    }

    protected init(): void {
        /* action controller */
        const actionController: ActionController = new ActionController();
        const addActionByOngFunc: RequestHandler = actionController.addActionByOng.bind(actionController);
        const getActionsByOngFunc: RequestHandler = actionController.getActionsByOng.bind(actionController);
        const getAllActionsFunc: RequestHandler = actionController.getAllActions.bind(actionController);
        
        /* validate auth token */
        const authMiddleware: AuthMiddleware = new AuthMiddleware();
        const checkAuthTokenFunc: RequestHandler = authMiddleware.checkAuthToken.bind(authMiddleware);

        this._router.post('/', [
            checkAuthTokenFunc
        ], addActionByOngFunc);

        this._router.get('/', [
            checkAuthTokenFunc
        ], getActionsByOngFunc);

        this._router.get('/all', [
            checkAuthTokenFunc
        ], getAllActionsFunc);
    }
};
