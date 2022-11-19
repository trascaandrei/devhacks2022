import { Schema, model } from 'mongoose';
import { RequestInterface } from '../interfaces/request_interface';
import { RequestStatus } from '../utils/request_status';

const ServiceSchema = new Schema({
    requestId: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    actionId: {
        type: String,
        required: true
    },
    companyId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: RequestStatus.PENDING
    },
    details: {
        type: Map
    }
});

export const RequestModel = model<RequestInterface>('RequestModel', ServiceSchema);
