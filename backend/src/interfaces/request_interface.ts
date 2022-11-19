import { Document } from 'mongoose';

export interface RequestInterface extends Document {
    requestId: string;
    serviceId: string;
    companyId: string;
    details: Record<string, unknown>;
};
