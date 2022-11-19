import { RequestHandler } from "express";
import { Routes } from './routes';
import { HistoryController } from '../controllers/history_controller';
import { AuthMiddleware } from '../middlewares/auth_middleware';

export class HistoryRoutes extends Routes {
    constructor () {
        super();
        this.init();
    }

    protected init(): void {
        /* history controller */
        const historyController: HistoryController = new HistoryController();
        const getAllByCompanyFunc: RequestHandler = historyController.getAllByCompany.bind(historyController);
        
        /* validate auth token */
        const authMiddleware: AuthMiddleware = new AuthMiddleware();
        const checkAuthTokenFunc: RequestHandler = authMiddleware.checkAuthToken.bind(authMiddleware);

        this._router.get('/', [
            checkAuthTokenFunc
        ], getAllByCompanyFunc);
    }
};
