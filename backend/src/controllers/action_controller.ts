import { Response, NextFunction } from 'express';
import { Controller } from './controller';
import { ActionService } from '../services/action_service';
import { Constants } from '../constants';
import { IRequest } from '../interfaces/express_req_interface';
import { v4 } from 'uuid';

export class ActionController extends Controller {
    private _actionService: ActionService = new ActionService();

    public async addActionByOng(req: IRequest, res: Response, next: NextFunction): Promise<void> {
        const actionData: Record<string, unknown> = {
            actionId: v4(),
            ongId: req.userId,
            activityId: req.body.activityId,
            details: req.body.details
        };

        await this._actionService.add(actionData);

        res.status(Constants.STATUS_CODE.CREATED).json({
            message: Constants.ERR_MESSAGES.ACTION_CREATED
        });
    }

    public async getActionsByOng(req: IRequest, res: Response, next: NextFunction): Promise<void> {
        res.status(Constants.STATUS_CODE.OK).json({
            actions: await this._actionService.findActions({ ongId: req.userId })
        });
    }

    public async getAllActions(req: Request, res: Response, next: NextFunction): Promise<void> {
        res.status(Constants.STATUS_CODE.OK).json({
            actions: await this._actionService.findAllActions()
        })
    }
};
