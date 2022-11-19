import { Response, NextFunction } from 'express';
import { Controller } from './controller';
import { HistoryService } from '../services/history_service';
import { Constants } from '../constants';
import { IRequest } from '../interfaces/express_req_interface';

export class HistoryController extends Controller {
    private _historyService: HistoryService = new HistoryService();

    public async getAllByCompany(req: IRequest, res: Response, next: NextFunction): Promise<void> {
        res.status(Constants.STATUS_CODE.OK).json({
            histories: await this._historyService.find({ companyId: req.userId })
        });
    }
};
