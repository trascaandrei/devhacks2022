import { Service } from './service';
import { Activity } from '../models/activity_model';
import { ActivityInterface } from '../interfaces/activity_interface';
import { LeanDocument } from 'mongoose';

export class ActivityService extends Service {
    public add(data: Record<string, unknown>): Promise<ActivityInterface> {
        const activity: ActivityInterface = new Activity(data);

        return activity.save();
    };

    public find(filter: Record<string, unknown> = {}, projection: Record<string, unknown> = {}): Promise<LeanDocument<ActivityInterface>[]> {
        return Activity.find(filter, projection).lean().exec();
    }
};
