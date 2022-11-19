import { Schema, model } from 'mongoose';
import { ServiceInterface } from '../interfaces/service_interface';

const ServiceSchema = new Schema({
    serviceId: {
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

export const Activity = model<ServiceInterface>('Activity', ServiceSchema);
