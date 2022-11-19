import { Document } from 'mongoose';

export interface HistoryInterface extends Document {
    historyId: string;
    activityId: string;
    companyId: string;
    ongId: string;
    ongDetails: Record<string, unknown>;
    companyDetails: Record<string, unknown>;
};
