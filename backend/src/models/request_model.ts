import { Schema, model } from 'mongoose';
import { RequestInterface } from '../interfaces/request_interface';

const ServiceSchema = new Schema({
    requestId: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    serviceId: {
        type: String,
        required: true
    },
    companyId: {
        type: String,
        required: true
    },
    details: {
        type: Map
    }
});

export const Activity = model<RequestInterface>('Activity', ServiceSchema);
