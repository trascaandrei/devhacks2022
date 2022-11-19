import { Document } from 'mongoose';
import { RequestStatus } from '../utils/request_status';

export interface RequestInterface extends Document {
    requestId: string;
    serviceId: string;
    companyId: string;
    status: RequestStatus;
    details: Record<string, unknown>;
};
