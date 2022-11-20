import { RequestHandler } from "express";
import { Routes } from './routes';
import { StatisticController } from '../controllers/statistic_controller';
import { AuthMiddleware } from "../middlewares/auth_middleware";

export class StatisticRoutes extends Routes {
    constructor () {
        super();
        this.init();
    }

    protected init(): void {
        /* statistic controller */
        const statisticController: StatisticController = new StatisticController();
        const getCompaniesByRankFunc: RequestHandler = statisticController.getCompaniesByRank.bind(statisticController);
        const groupCompanyRequestsFunc: RequestHandler = statisticController.groupCompanyRequests.bind(statisticController);
        const groupCompanyHistoriesFunc: RequestHandler = statisticController.groupCompanyHistories.bind(statisticController);

        /* validate auth token */
        const authMiddleware: AuthMiddleware = new AuthMiddleware();
        const checkAuthTokenFunc: RequestHandler = authMiddleware.checkAuthToken.bind(authMiddleware);

        this._router.get('/companies/ranks', getCompaniesByRankFunc);

        this._router.get('/companies/requests', [
            checkAuthTokenFunc
        ], groupCompanyRequestsFunc);

        this._router.get('/companies/histories', [
            checkAuthTokenFunc
        ], groupCompanyHistoriesFunc);
    }
};
