
import ActivityStore from "./activityStore";
import {createContext, useContext } from "react";
import CommonStore from "./commonStore";
import UserStore from "./userStore";
import ModalStore from "./modalStore";
import ProfileStore from "./profileStore";
import { CommentStore } from "./commenStore";


interface Store{
    userStore: UserStore;
    activityStore: ActivityStore;
    commonStore: CommonStore;
    modalStore: ModalStore;
    profileStore: ProfileStore;
    commentStor: CommentStore
}

export const store: Store = {
    userStore: new UserStore(),
    activityStore: new ActivityStore(),
    commonStore: new CommonStore(),
    modalStore: new ModalStore(),
    profileStore: new ProfileStore(),
    commentStor: new CommentStore()
}

export const StoreContext = createContext(store);

export const useStore = () => useContext(StoreContext);