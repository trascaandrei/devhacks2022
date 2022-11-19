import { makeObservable, observable, action, } from "mobx";
import { API_CONSTS, ACTIVITY_TYPES_FIELDS } from "../utils/constants";

export interface IActivityType {
    activityId: string;
    description: string;
    name: string;
    details: {
        key: string;
        value: string;
    }[];
}

export interface IActivity {
    actionId: string;
    details: {
        nrSquareMeters?: number,
        pricePerSquareMeter?: number,
        nrTrees?: number,
        pricePerTree?: number,
    };
    activity: {
        activityId: string,
        name: string,
        description: string,
        details: string,
    };
}

export class ActivitiesStore {
    constructor() {
        makeObservable(this, {
            activities: observable,
            setActivities: action,
            fetchActivities: action,

            activityTypes: observable,
            setActivityTpes: action,
            fetchActivityTypes: action,
        });
    }

    // ACTIVITIES
    public activities: IActivity[] = [];

    public setActivities = (activities: IActivity[]) => {
        this.activities = activities;
    }

    public fetchActivities = async () => {
        const response = await 
            fetch(`${API_CONSTS.BASE_URL}/actions`, {
                headers: {
                    Authorization: API_CONSTS.BEARER,
                },
            })
            .then((res) => res.json())
            .catch((err) => {
                console.log(err);
            });

        console.log(response);
    }

    public createActivity = async (activity: any) => {
        await fetch(`${API_CONSTS.BASE_URL}/actions`, {
            method: 'POST',
            headers: {
                Authorization: API_CONSTS.BEARER,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(activity),
        })
        .catch((err) => {
            console.log(err);
        });

        this.fetchActivities();
    }


    // ACTIVITY TYPES
    public activityTypes: IActivityType[] = [];

    public setActivityTpes = (activityTypes: IActivityType[]) => {
        this.activityTypes = activityTypes;
    };

    public fetchActivityTypes = async () => {
        if (this.activityTypes.length === 0) {
            const data = await 
                fetch(`${API_CONSTS.BASE_URL}/activities`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Authorization': API_CONSTS.BEARER,
                        'Content-Type': 'application/json',
                    }
                })
                .then((res) => res.json())
                .catch((err) => {
                    console.log(err);
                });

            if (data) {
                this.setActivityTpes(data?.activities?.map?.((activity: any) => {
                    return {
                        ...activity,
                        details: activity.details?.map((detail: string) => {
                            return {
                                key: detail,
                                value: ACTIVITY_TYPES_FIELDS[detail as keyof typeof ACTIVITY_TYPES_FIELDS],
                            }
                        }),
                    }
                }) as IActivityType[]);
            }
        }
    }
}

