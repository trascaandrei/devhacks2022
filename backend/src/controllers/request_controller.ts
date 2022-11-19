import { Response, NextFunction } from 'express';
import { Controller } from './controller';
import { RequestService } from '../services/request_service';
import { Constants } from '../constants';
import { IRequest } from '../interfaces/express_req_interface';
import { v4 } from 'uuid';

export class RequestController extends Controller {
    private _requestService: RequestService = new RequestService();

    public async addRequestByCompany(req: IRequest, res: Response, next: NextFunction): Promise<void> {
        const actionData: Record<string, unknown> = {
            requestId: v4(),
            companyId: req.userId,
            actionId: req.body.actionId,
            details: req.body.details
        };

        await this._requestService.add(actionData);

        res.status(Constants.STATUS_CODE.CREATED).json({
            message: Constants.ERR_MESSAGES.REQUEST_CREATED
        });
    }

    public async getRequestsForOng(req: IRequest, res: Response, next: NextFunction): Promise<void> {
        res.status(Constants.STATUS_CODE.OK).json({
            requests: await this._requestService.findRequests({ 'actions.ongId': req.userId })
        });
    }

    // TODO: get requests created by a company - next API
};
