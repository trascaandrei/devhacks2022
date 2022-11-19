import { ActivityInterface } from './activity_interface';

export interface CompanyInfo {
    cui: string;
};

export interface RequestDetailsInterface {
    requestId: string;
    activity: ActivityInterface;
    company: CompanyInfo;
    status: string;
    details: Record<string, unknown>;
};
