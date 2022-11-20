import { Response, NextFunction } from 'express';
import { Controller } from './controller';
import { RequestService } from '../services/request_service';
import { Constants } from '../constants';
import { IRequest } from '../interfaces/express_req_interface';
import { v4 } from 'uuid';
import { RequestStatus } from '../utils/request_status';
import { ServerError } from '../errors/server_error';
import { InternalRequestDetailsInterface } from '../interfaces/request_details_interface';
import { HistoryService } from '../services/history_service';
import { UserInterface } from '../interfaces/user_interface';
import { UserService } from '../services/user_service';
import { UserType } from '../utils/user_type';

export class RequestController extends Controller {
    private _requestService: RequestService = new RequestService();
    private _historyService: HistoryService = new HistoryService();
    private _userService: UserService = new UserService();

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

    private _getNextStatus(status: RequestStatus): RequestStatus | null {
        if (status === RequestStatus.PENDING) {
            return RequestStatus.ACCEPTED;
        }

        if (status === RequestStatus.ACCEPTED) {
            return RequestStatus.COMPLETED;
        }

        return null;
    }

    private _getCredit(details: Record<string, unknown>): number {
        return (details.nrSquareMeters || details.nrTrees || 0) as number;
    }

    public async updateRequestStatusByOng(req: IRequest, res: Response, next: NextFunction): Promise<void> {
        const request: InternalRequestDetailsInterface = await this._requestService.getRequestDetails(req.params.requestId, req.userId);
        
        const status: RequestStatus = req.body.status;
        const nextStatus: RequestStatus | null = this._getNextStatus(request.status);

        if (nextStatus === null || (status !== RequestStatus.REJECTED && status !== nextStatus)
                || (status === RequestStatus.REJECTED && request.status === RequestStatus.ACCEPTED)) {
            throw new ServerError(Constants.ERR_MESSAGES.UNAUTHORIZED, Constants.STATUS_CODE.UNAUTHORIZED);
        }

        if (status === RequestStatus.COMPLETED || status === RequestStatus.REJECTED) {
            await this._requestService.delete({ requestId: req.params.requestId });

            const historyData: Record<string, unknown> = {
                historyId: v4(),
                activityId: request.activityId,
                ongId: request.ongId,
                companyId: request.companyId,
                companyDetails: request.companyDetails,
                ongDetails: request.ongDetails,
                status,
                action: request.action
            };

            if (status === RequestStatus.COMPLETED) {
                const value: number = this._getCredit(request.companyDetails);

                if (value) {
                    await this._userService.updateOne({ userId: request.companyId }, { $inc: { currentCredit: value }});
                }
            }

            await this._historyService.add(historyData);
        } else {
            const filter: Record<string, unknown> = {
                requestId: req.params.requestId
            };
    
            const data: Record<string, unknown> = { status };
    
            await this._requestService.update(filter, data);
        }

        res.status(Constants.STATUS_CODE.OK).json({
            message: Constants.ERR_MESSAGES.REQUEST_UPDATED
        });
    }
};
