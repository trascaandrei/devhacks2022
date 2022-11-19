import { Service } from './service';
import { RequestInterface } from '../interfaces/request_interface';
import { RequestModel } from '../models/request_model';
import { ServerError } from '../errors/server_error';
import { Constants } from '../constants';
import { RequestDetailsInterface } from '../interfaces/request_details_interface';

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
                        cui: "$companies.cui"
                    },
                    status: 1,
                    details: 1
                }
            }
        ]);
    }
};
