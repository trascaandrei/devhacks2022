import { Service } from './service';
import { UserInterface } from '../interfaces/user_interface';
import { LeanDocument } from 'mongoose';
import { User } from '../models/user_model';
import { RequestModel } from '../models/request_model';
import { History } from '../models/history_model';

export class StatisticService extends Service {
    public find(filter: Record<string, unknown> = {}, projection: Record<string, unknown> = {}): Promise<LeanDocument<UserInterface>[]> {
        return User.find(filter, projection).lean().exec();
    }

    public async groupRequests(filter: Record<string, unknown> ): Promise<any> {
        return RequestModel.aggregate([
            {
                $match: filter
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
                $lookup: {
                    from: 'users',
                    localField: 'actions.ongId',
                    foreignField: 'userId',
                    as: 'ongs'
                }
            },
            {
                $unwind: '$ongs'
            },
            {
                $group: {
                    _id: '$status',
                    activities: {
                        $push: {
                            activityId: '$activities.activityId',
                            name: '$activities.name',
                            description: '$activities.description'
                        }
                    },
                    actions: {
                        $push: {
                            title: '$actions.title',
                            description: '$actions.description'
                        }
                    },
                    ongs: {
                        $push: {
                            name: '$ongs.name',
                            email: '$ongs.email'
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    status: '$_id',
                    activities: 1,
                    actions: 1,
                    ongs: 1
                }
            }
        ]);
    }

    public async groupHistories(filter: Record<string, unknown> ): Promise<any> {
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
                $group: {
                    _id: '$status',
                    activities: {
                        $push: {
                            activityId: '$activities.activityId',
                            name: '$activities.name',
                            description: '$activities.description'
                        }
                    },
                    actions: {
                        $push: '$action'
                    },
                    ongs: {
                        $push: {
                            name: '$ongs.name',
                            email: '$ongs.email',
                            ongDetails: '$ongDetails'
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    status: '$_id',
                    activities: 1,
                    actions: 1,
                    ongs: 1
                }
            }
        ]);
    }
};
