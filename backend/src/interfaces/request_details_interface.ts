import { RequestStatus } from '../utils/request_status';
import { ActionInfoInterface } from './action_interface';
import { ActivityInterface } from './activity_interface';
import { CompanyInterface } from './user_interface';

export interface RequestDetailsInterface {
    requestId: string;
    activity: ActivityInterface;
    action: ActionInfoInterface;
    company: CompanyInterface;
    status: string;
    details: Record<string, unknown>;
};

export interface InternalRequestDetailsInterface {
    status: RequestStatus;
    companyId: string;
    ongId: string;
    activityId: string;
    ongDetails: Record<string, unknown>;
    companyDetails: Record<string, unknown>;
    action: ActionInfoInterface;
};
