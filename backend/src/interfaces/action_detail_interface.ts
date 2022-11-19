import { ActionInfoInterface } from './action_interface';
import { ActivityInterface } from './activity_interface';
import { OngInterface } from './user_interface';

export interface ActionDetailsInterface extends ActionInfoInterface {
    actionId: string;
    activity: ActivityInterface;
    details: Record<string, unknown>;
};
export interface ExtendedActionDetailsInterface extends ActionDetailsInterface {
    ong: OngInterface;
};
