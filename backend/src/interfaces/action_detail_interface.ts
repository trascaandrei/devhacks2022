import { ActivityInterface } from './activity_interface';
import { OngInterface } from './user_interface';
import { Document } from 'mongoose';

export interface ActionDetailsInterface {
    actionId: string;
    activity: ActivityInterface;
    details: Record<string, unknown>;
};
export interface ExtendedActionDetailsInterface extends ActionDetailsInterface {
    ong: OngInterface;
};
