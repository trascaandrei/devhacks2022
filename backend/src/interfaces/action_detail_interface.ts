import { ActivityInterface } from './activity_interface';

export interface ActionDetailsInterface {
    actionId: string;
    activity: ActivityInterface;
    details: Record<string, unknown>;
};
