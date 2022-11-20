import { makeObservable, observable, action, } from "mobx";
import { API_CONSTS, ACTIVITY_TYPES_FIELDS } from "../utils/constants";
import { rootStore } from "./index";

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
    title: string;
    description: string;
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
            createRequest: action,
        });
    }

    // ACTIVITIES
    public activities: IActivity[] = [];

    public setActivities = (activities: IActivity[]) => {
        this.activities = activities;
    }

    public fetchActivities = async () => {
        const token = JSON.parse(window.localStorage.getItem('userData') || '{}').accessToken;
        const response = await 
            fetch(`${API_CONSTS.BASE_URL}/actions`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => res.json())
            .catch((err) => {
                console.log(err);
            });

        this.setActivities(response.actions);
    }

    public createActivity = async (activity: any) => {
        const token = JSON.parse(window.localStorage.getItem('userData') || '{}').accessToken;
        await fetch(`${API_CONSTS.BASE_URL}/actions`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(activity),
        })
        .catch((err) => {
            console.log(err);
        });

        this.fetchActivities();
    }

    public createRequest = async (action: any) => {
        const token = JSON.parse(window.localStorage.getItem('userData') || '{}').accessToken;
        await fetch(`${API_CONSTS.BASE_URL}/requests/`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(action),
        })
        .catch((err) => {
            console.log(err);
        });
    }

    // ACTIVITY TYPES
    public activityTypes: IActivityType[] = [];

    public setActivityTpes = (activityTypes: IActivityType[]) => {
        this.activityTypes = activityTypes;
    };

    public fetchActivityTypes = async () => {
        const token = JSON.parse(window.localStorage.getItem('userData') || '{}').accessToken;
        if (this.activityTypes.length === 0) {
            const data = await 
                fetch(`${API_CONSTS.BASE_URL}/activities`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Authorization': `Bearer ${token}`,
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

