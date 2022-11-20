import { Response, NextFunction } from 'express';
import { Controller } from './controller';
import { StatisticService } from '../services/statistic_service';
import { Constants } from '../constants';
import { UserType } from '../utils/user_type';
import { IRequest } from '../interfaces/express_req_interface';
import { RequestStatus } from '../utils/request_status';

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

    private _processResult(requests, result) {
        for (let i = 0; i < requests.length; ++i) {
            const factor: number = Math.round(requests[i].activities.length / 20);
            let current: number = 0;
            let step = 0;

            for (let j = 0; j < requests[i].activities.length;) {
                const date = new Date();
                date.setDate(date.getDate() - step);
                const strDate: string = date.toISOString().split('T')[0].split('-').reverse().join('-');

                result[requests[i].status][strDate] = []
                current = j;

                for (let k = current; k < requests[i].activities.length && k < current + factor; ++k) {
                    result[requests[i].status][strDate].push({
                        action: requests[i].actions[k],
                        activity: requests[i].activities[k],
                        ong: requests[i].ongs[k]
                    });
                }

                j = Math.min(requests[i].activities.length, current + factor);

                ++step;
            }
        }

        return result;
    }

    public async groupCompanyRequests(req: IRequest, res: Response, next: NextFunction): Promise<void> {
        const requests = await this._statisticService.groupRequests({ companyId: req.userId });

        const result = {
            [RequestStatus.PENDING]: {},
            [RequestStatus.ACCEPTED]: {}
        };
    
        res.status(Constants.STATUS_CODE.CREATED).json({
            requests: this._processResult(requests, result)
        });
    }
    
    public async groupCompanyHistories(req: IRequest, res: Response, next: NextFunction): Promise<void> {
        const histories = await this._statisticService.groupHistories({ companyId: req.userId });

        const result = {
            [RequestStatus.COMPLETED]: {},
            [RequestStatus.REJECTED]: {}
        };

        res.status(Constants.STATUS_CODE.CREATED).json({
            histories: this._processResult(histories, result)
        });
    }
};
