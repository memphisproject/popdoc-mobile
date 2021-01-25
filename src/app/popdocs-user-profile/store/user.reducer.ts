import { User } from 'src/app/_models/User';
import { Notification } from 'src/app/_models/Notification';

import * as UserActions from './user.actions';

export interface State {
    userData: {};
    currentUser: User;
    userNotifications: Notification[];
    loading: boolean;
}

const initialState = {
    userData: null,
    currentUser: null,
    userNotifications: null,
    loading: false
};


export function userReducer(
    state = initialState,
    action: UserActions.UserActions
) {
    switch (action.type) {
        case UserActions.FETCH_USER_DATA:
            return {
                ...state,
                loading: true
            };
        case UserActions.FETCH_USER_DATA_SUCCESS:
            const user = action.payload;
            const newUserData = { ...state.userData };
            newUserData[`${user._id}`] = user;

            return {
                ...state,
                userData: newUserData,
                loading: false
            };
        case UserActions.FETCH_CURRENT_USER_DATA_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                loading: false
            };
        case UserActions.FETCH_USER_NOTIFCATIONS_SUCCESS:
            return {
                ...state,
                userNotifications: action.payload
            };
        default: return state;
    }
}
