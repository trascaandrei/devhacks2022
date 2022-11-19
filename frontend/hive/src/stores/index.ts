import { ActivitiesStore } from "./ActivitiesStore";
import { UserStore } from "./UserStore";

export const rootStore = {
    activitiesStore: new ActivitiesStore(),
    userStore: new UserStore(),
}
