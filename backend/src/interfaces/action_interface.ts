import { Document } from 'mongoose';

export interface ActionInterface extends Document {
    actionId: string;
    ongId: string;
    activityId: string;
    details: Record<string, unknown>;
};
