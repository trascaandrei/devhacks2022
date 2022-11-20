import { RequestHandler } from "express";
import { Routes } from './routes';
import { StatisticController } from '../controllers/statistic_controller';

export class StatisticRoutes extends Routes {
    constructor () {
        super();
        this.init();
    }

    protected init(): void {
        /* statistic controller */
        const statisticController: StatisticController = new StatisticController();
        const getCompaniesByRankFunc: RequestHandler = statisticController.getCompaniesByRank.bind(statisticController);

        this._router.get('/companies/ranks', getCompaniesByRankFunc);
    }
};
