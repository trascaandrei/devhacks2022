import { Document } from 'mongoose';

export interface ServiceInterface extends Document {
    serviceId: string;
    ongId: string;
    activityId: string;
    details: Record<string, unknown>;
};
