import { Response, NextFunction } from 'express';
import { Controller } from './controller';
import { StatisticService } from '../services/statistic_service';
import { Constants } from '../constants';
import { UserType } from '../utils/user_type';
import { IRequest } from '../interfaces/express_req_interface';

export class StatisticController extends Controller {
    private _statisticService: StatisticService = new StatisticService();

    public async getCompaniesByRank(req: Request, res: Response, next: NextFunction): Promise<void> {
        const filter: Record<string, unknown> = {
            type: UserType.COMPANY
        };
        const projection: Record<string, unknown> = {
            _id: 0,
            companyId: '$userId',
            name: 1,
            email: 1,
            currentCredit: 1,
            targetCredit: 1,
            logoUrl: 1
        };

        res.status(Constants.STATUS_CODE.CREATED).json({
            companies: await this._statisticService.find(filter, projection)
        });
    }

    public async groupCompanyRequests(req: IRequest, res: Response, next: NextFunction): Promise<void> {
        res.status(Constants.STATUS_CODE.CREATED).json({
            requests: await this._statisticService.groupRequests({ companyId: req.userId })
        });
    }
    
    public async groupCompanyHistories(req: IRequest, res: Response, next: NextFunction): Promise<void> {
        res.status(Constants.STATUS_CODE.CREATED).json({
            histories: await this._statisticService.groupHistories({ companyId: req.userId })
        });
    }
};
