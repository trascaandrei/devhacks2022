import { Service } from './service';
import { Activity } from '../models/activity_model';
import { ActivityInterface } from '../interfaces/activity_interface';
import { Constants } from '../constants';
import { LeanDocument } from 'mongoose';
import { ServerError } from '../errors/server_error';

export class ActivityService extends Service {
    public add(data: Record<string, unknown>): Promise<ActivityInterface> {
        const activity: ActivityInterface = new Activity(data);

        return activity.save();
    };

    public find(filter: Record<string, unknown> = {}, projection: Record<string, unknown> = {}): Promise<LeanDocument<ActivityInterface>[]> {
        return Activity.find(filter, projection).lean().exec();
    }
};
