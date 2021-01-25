import { Action } from '@ngrx/store';
import { Collection } from 'src/app/_models/Collection';
import { User } from 'src/app/_models/User';

export const FETCH_USER_DATA = '[User] Fetch User Data';
export const FETCH_USER_DATA_SUCCESS  = '[User] Fetch User Data Success';
export const FETCH_CURRENT_USER_DATA_SUCCESS  = '[User] Fetch Current User Data Success';
export const FETCH_USER_PROFILE_COLLECTIONS = '[User] Fetch User Homepage Collections';
export const FETCH_USER_PROFILE_COLLECTIONS_SUCCESS = '[User] Fetch User Homepage Collections Success';
export const FETCH_USER_NOTIFCATIONS = '[User] Fetch User Notifications';
export const FETCH_USER_NOTIFCATIONS_SUCCESS = '[User] Fetch User Notifications Succcess';

export class FetchUserData implements Action {
    readonly type = FETCH_USER_DATA;

    constructor(public payload: string)  {}
}

export class FetchUserDataSuccess implements Action {
    readonly type = FETCH_USER_DATA_SUCCESS;

    constructor(public payload: User)  {}
}

export class FetchCurrentUserDataSuccess implements Action {
    readonly type = FETCH_CURRENT_USER_DATA_SUCCESS;

    constructor(public payload: User)  {}
}

export class FetchUserProfileCollections implements Action {
    readonly type = FETCH_USER_PROFILE_COLLECTIONS;

    constructor(public payload: string)  {}
}

export class FetchUserProfileCollectionsSuccess implements Action {
    readonly type = FETCH_USER_PROFILE_COLLECTIONS_SUCCESS;

    constructor(public payload: Collection[])  {}
}

export class FetchUserNotifications implements Action {
    readonly type = FETCH_USER_NOTIFCATIONS;
}

export class FetchUserNotificationsSuccess implements Action {
    readonly type = FETCH_USER_NOTIFCATIONS_SUCCESS;

    constructor(public payload: Notification[])  {}
}

export type UserActions =
    | FetchUserData
    | FetchCurrentUserDataSuccess
    | FetchUserDataSuccess
    |FetchUserNotifications
    |FetchUserNotificationsSuccess;

