import { Service } from './service';
import { UserInterface } from '../interfaces/user_interface';
import { LeanDocument } from 'mongoose';
import { User } from '../models/user_model';

export class StatisticService extends Service {
    public find(filter: Record<string, unknown> = {}, projection: Record<string, unknown> = {}): Promise<LeanDocument<UserInterface>[]> {
        return User.find(filter, projection).lean().exec();
    }
};
