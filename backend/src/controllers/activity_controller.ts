import { Request, Response, NextFunction } from 'express';
import { Controller } from './controller';
import { ActivityService } from '../services/activity_service';
import { Constants } from '../constants';

export class ActivityController extends Controller {
    private _activityService: ActivityService = new ActivityService();

    public async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
        const projection: Record<string, unknown> = {
            _id: 0,
            activityId: 1,
            name: 1,
            description: 1,
            details: 1
        };

        res.status(Constants.STATUS_CODE.OK).json({
            activities: await this._activityService.find({}, projection)
        });
    }
};
