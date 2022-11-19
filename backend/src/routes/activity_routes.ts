import { RequestHandler } from "express";
import { Routes } from './routes';
import { ActivityController } from '../controllers/activity_controller';
import { AuthMiddleware } from '../middlewares/auth_middleware';

export class ActivityRoutes extends Routes {
    constructor () {
        super();
        this.init();
    }

    protected init(): void {
        /* activity controller */
        const activityController: ActivityController = new ActivityController();
        const getAllFunc: RequestHandler = activityController.getAll.bind(activityController);
        
        /* validate auth token */
        const authMiddleware: AuthMiddleware = new AuthMiddleware();
        const checkAuthTokenFunc: RequestHandler = authMiddleware.checkAuthToken.bind(authMiddleware);

        this._router.get('/', [
            checkAuthTokenFunc
        ], getAllFunc);
    }
};
