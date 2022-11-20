import { Service } from './service';
import { History } from '../models/history_model';
import { HistoryDetailsInterface, HistoryInterface } from '../interfaces/history_interface';

export class HistoryService extends Service {
    public add(data: Record<string, unknown>): Promise<HistoryInterface> {
        const history: HistoryInterface = new History(data);

        return history.save();
    };

    public async find(filter: Record<string, unknown>): Promise<HistoryDetailsInterface[]> {
        return History.aggregate([
            {
                $match: filter
            },
            {
                $lookup: {
                    from: 'activities',
                    localField: 'activityId',
                    foreignField: 'activityId',
                    as: 'activities'
                }
            },
            {
                $unwind: '$activities'
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'ongId',
                    foreignField: 'userId',
                    as: 'ongs'
                }
            },
            {
                $unwind: '$ongs'
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
                    historyId: 1,
                    activity: {
                        activityId: '$activities.activityId',
                        name: '$activities.name',
                        description: '$activities.description',
                        details: '$activities.details'
                    },
                    action: 1,
                    ong: {
                        cui: "$ongs.cui",
                        email: "$ongs.email",
                        name: "$ongs.name"
                    },
                    company: {
                        cui: "$companies.cui",
                        email: "$companies.email",
                        name: "$companies.name",
                        logoUrl: "$companies.logoUrl"
                    },
                    ongDetails: 1,
                    companyDetails: 1,
                    status: 1
                }
            }
        ]);
    }
};
