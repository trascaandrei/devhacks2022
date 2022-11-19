import { Document } from 'mongoose';

export interface ActionInfoInterface {
    title: string;
    description: string;
};
export interface ActionInterface extends Document, ActionInfoInterface {
    actionId: string;
    ongId: string;
    activityId: string;
    details: Record<string, unknown>;
};
