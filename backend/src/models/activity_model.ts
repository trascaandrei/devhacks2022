import { Schema, model } from 'mongoose';
import { ActivityInterface } from '../interfaces/activity_interface';

const ActivitySchema = new Schema({
    activityId: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    details: {
        type: Map
    }
});

export const Activity = model<ActivityInterface>('Activity', ActivitySchema);
