import { cu } from "chart.js/dist/chunks/helpers.core";
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

export interface IHistory {
    status: string;
    action: {
        title: string;
        description: string;
    };
    companyDetails: {
        nrSquareMeters?: number,
        pricePerSquareMeter?: number,
        nrTrees?: number,
        pricePerTree?: number,
    }
}

export interface IRequest {
    requestId: string;
    company: {
        name: string;
    };
    details: {
        nrSquareMeters?: number,
        pricePerSquareMeter?: number,
        nrTrees?: number,
        pricePerTree?: number,
    };
    action: {
        title: string;
        description: string;
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

            requests: observable,
            setRequests: action,
            fetchRequests: action,

            history: observable,
            setHistory: action,
            fetchHistory: action,

            fetchAnalytics: action,
            analyticsHistory: observable,
            setAnalytics: action,
            analyticsRequests: observable,
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
            fetch(`${API_CONSTS.BASE_URL}/actions/all`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => res.json())
            .catch((err) => {
                console.log(err);
            });

        this.setActivities(response.actions.slice(0, 5));
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

    // REQUESTS
    public requests: IRequest[] = [];

    public setRequests = (requests: IRequest[]) => {
        this.requests = requests;
    }

    public fetchRequests = async () => {
        const token = JSON.parse(window.localStorage.getItem('userData') || '{}').accessToken;
        const response = await 
            fetch(`${API_CONSTS.BASE_URL}/requests`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => res.json())
            .catch((err) => {
                console.log(err);
            });
        this.setRequests(response.requests.slice(0, 5));
    }

    public approveRequest = async (requestId: string) => {
        const token = JSON.parse(window.localStorage.getItem('userData') || '{}').accessToken;
        await fetch(`${API_CONSTS.BASE_URL}/requests/${requestId}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                status: 'completed',
            }),
        })
        .catch((err) => {
            console.log(err);
        });
        this.fetchRequests();
    }

    // HISTORY
    public history: IHistory[] = [];

    public setHistory = (history: IHistory[]) => {
        this.history = history;
    }

    public fetchHistory = async () => {
        const token = JSON.parse(window.localStorage.getItem('userData') || '{}').accessToken;
        const response = await 
            fetch(`${API_CONSTS.BASE_URL}/histories`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => res.json())
            .catch((err) => {
                console.log(err);
            });
        this.setHistory(response.histories.slice(0, 5));
    }

    // ANALYTICS
    public analyticsRequests: any = null;
    public analyticsHistory: any = null;

    public setAnalytics = (requestsData: any, historyData: any) => {
        this.analyticsHistory = {
            completed: Object.keys(historyData.histories.completed).map((key: string) => {
                return {
                    [key]: historyData.histories.completed?.[key]?.length,
                }   
            }).reduce((acc, curr) => {
                return {
                    ...acc, ...curr
                }
            }, {}),
            rejected: Object.keys(historyData.histories.rejected).map((key: string) => {
                return {
                    [key]: historyData.histories.rejected?.[key]?.length,
                }   
            }).reduce((acc, curr) => {
                return {
                    ...acc, ...curr
                }
            }, {}),
        }

        this.analyticsRequests = {
            pending: Object.keys(requestsData.requests.pending).map((key: string) => {
                return {
                    [key]: requestsData.requests.pending?.[key]?.length,
                }   
            }).reduce((acc, curr) => {
                return {
                    ...acc, ...curr
                }
            }, {}),
            accepted: Object.keys(requestsData.requests.accepted).map((key: string) => {
                return {
                    [key]: requestsData.requests.accepted?.[key]?.length,
                }   
            }).reduce((acc, curr) => {
                return {
                    ...acc, ...curr
                }
            }, {}),
        }
    }

    public fetchAnalytics = async () => {
        const token = JSON.parse(window.localStorage.getItem('userData') || '{}').accessToken;
        const response1 = await fetch(`${API_CONSTS.BASE_URL}/statistics/companies/requests`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const response2 = await fetch(`${API_CONSTS.BASE_URL}/statistics/companies/histories`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        
        const data1 = await response1.json();
        const data2 = await response2.json();

        this.setAnalytics(data1, data2);
    }
}

