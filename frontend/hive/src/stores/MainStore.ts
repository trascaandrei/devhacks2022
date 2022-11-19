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

export class MainStore {
    constructor() {
        makeObservable(this, {
            activityTypes: observable,
            setActivityTpes: action,
            fetchActivityTypes: action,
        });
    }

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

