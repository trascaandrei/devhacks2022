import { Schema, model } from 'mongoose';
import { HistoryInterface } from '../interfaces/history_interface';
import { RequestStatus } from '../utils/request_status';

const HistorySchema = new Schema({
    historyId: {
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
    companyId: {
        type: String,
        required: true
    },
    ongDetails: {
        type: Map
    },
    companyDetails: {
        type: Map
    },
    status: {
        type: String,
        required: true,
        enum: [RequestStatus.COMPLETED, RequestStatus.REJECTED]
    },
    action: {
        _id: false,
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        }
    }
});

export const History = model<HistoryInterface>('History', HistorySchema);
