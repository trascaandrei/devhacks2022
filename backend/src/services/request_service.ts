import { Service } from './service';
import { RequestInterface } from '../interfaces/request_interface';
import { RequestModel } from '../models/request_model';
import { ServerError } from '../errors/server_error';
import { Constants } from '../constants';
import { InternalRequestDetailsInterface, RequestDetailsInterface } from '../interfaces/request_details_interface';

export class RequestService extends Service {
    public add(data: Record<string, unknown>): Promise<RequestInterface> {
        const request: RequestInterface = new RequestModel(data);

        return request.save();
    };

    public async findRequests(filter: Record<string, unknown>): Promise<RequestDetailsInterface[]> {
        return RequestModel.aggregate([
            {
                $lookup: {
                    from: 'actions',
                    localField: 'actionId',
                    foreignField: 'actionId',
                    as: 'actions'
                }
            },
            {
                $unwind: '$actions'
            },
            {
                $lookup: {
                    from: 'activities',
                    localField: 'actions.activityId',
                    foreignField: 'activityId',
                    as: 'activities'
                }
            },
            {
                $unwind: '$activities'
            },
            {
                $match: filter
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'companyId',
                    foreignField: 'userId',
                    as: 'companies'
                }
            },
            {
                $unwind: '$companies'
            },
            {
                $project: {
                    _id: 0,
                    requestId: 1,
                    activity: {
                        activityId: '$activities.activityId',
                        name: '$activities.name',
                        description: '$activities.description',
                        details: '$activities.details'
                    },
                    company: {
                        cui: '$companies.cui',
                        email: '$companies.email'
                    },
                    status: 1,
                    details: 1
                }
            }
        ]);
    }

    public async getRequestDetails(requestId: string, ongId: string): Promise<InternalRequestDetailsInterface> {
        const result = await RequestModel.aggregate([
            {
                $match: {
                    requestId
                }
            },
            {
                $lookup: {
                    from: 'actions',
                    localField: 'actionId',
                    foreignField: 'actionId',
                    as: 'actions'
                }
            },
            {
                $unwind: '$actions'
            },
            {
                $match: {
                    'actions.ongId': ongId
                }
            },
            {
                $project: {
                    _id: 0,
                    status: 1,
                    companyId: 1,
                    ongId: '$actions.ongId',
                    activityId: '$actions.activityId',
                    ongDetails: '$actions.details',
                    companyDetails: '$details'
                }
            }
        ]);

        if (!result.length) {
            throw new ServerError(Constants.ERR_MESSAGES.UNAUTHORIZED, Constants.STATUS_CODE.UNAUTHORIZED);
        }

        return result[0];
    }

    public update(filter: Record<string, unknown>, data: Record<string, unknown>) {
        return RequestModel.updateOne(filter, { $set: data });
    }

    public delete(filter: Record<string, unknown>) {
        return RequestModel.deleteOne(filter);
    }
 };
