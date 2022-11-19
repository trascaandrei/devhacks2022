import { Document } from 'mongoose';

export interface ActivityInterface extends Document {
    activityId: string;
    name: string;
    description?: string;
    details: string[];
};
