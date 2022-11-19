import { Document } from 'mongoose';
import { RequestStatus } from '../utils/request_status';
import { ActionInfoInterface } from './action_interface';
import { ActivityInterface } from './activity_interface';
import { CompanyInterface, OngInterface } from './user_interface';

export interface HistoryInterface extends Document {
    historyId: string;
    activityId: string;
    companyId: string;
    ongId: string;
    ongDetails: Record<string, unknown>;
    companyDetails: Record<string, unknown>;
    action: ActionInfoInterface;
    status: RequestStatus;
};

export interface HistoryDetailsInterface {
    historyId: string;
    activity: ActivityInterface;
    ong: OngInterface;
    company: CompanyInterface;
    ongId: string;
    ongDetails: Record<string, unknown>;
    companyDetails: Record<string, unknown>;
    status: RequestStatus;
    action: ActionInfoInterface;
};
