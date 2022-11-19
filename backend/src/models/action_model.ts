import { Schema, model } from 'mongoose';
import { ActionInterface } from '../interfaces/action_interface';

const ActionSchema = new Schema({
    actionId: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    activityId: {
        type: String,
        required: true
    },
    ongId: {
        type: String,
        required: true
    },
    details: {
        type: Map
    }
});

export const Action = model<ActionInterface>('Action', ActionSchema);
