import { Service } from './service';
import { ActionInterface } from '../interfaces/action_interface';
import { Action } from '../models/action_model';
import { ActionDetailsInterface, ExtendedActionDetailsInterface } from '../interfaces/action_detail_interface';

export class ActionService extends Service {
    public add(data: Record<string, unknown>): Promise<ActionInterface> {
        const action: ActionInterface = new Action(data);

        return action.save();
    };

    public async findActions(filter: Record<string, unknown>): Promise<ActionDetailsInterface[]> {
        return Action.aggregate([
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
                $project: {
                    _id: 0,
                    actionId: 1,
                    activity: {
                        activityId: '$activities.activityId',
                        name: '$activities.name',
                        description: '$activities.description',
                        details: '$activities.details'
                    },
                    details: 1
                }
            }
        ]);
    }

    public async findAllActions(): Promise<ExtendedActionDetailsInterface[]> {
        return Action.aggregate([
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
                $project: {
                    _id: 0,
                    actionId: 1,
                    activity: {
                        activityId: '$activities.activityId',
                        name: '$activities.name',
                        description: '$activities.description',
                        details: '$activities.details'
                    },
                    details: 1,
                    ong: {
                        email: '$ongs.email',
                        cui: '$ongs.cui'
                    }
                }
            }
        ]);
    }
};
