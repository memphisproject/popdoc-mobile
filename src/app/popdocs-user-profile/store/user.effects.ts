import * as UserActions from './user.actions';
import {catchError, switchMap, map, tap, concatMap} from 'rxjs/operators';
import { AuthResponseData } from 'src/app/_models/authResponseData.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import { User } from 'src/app/_models/User';
import { of } from 'rxjs';

@Injectable()
export class UserEffects {
    @Effect()
    fetchUserData = this.actions$.pipe(
        ofType(UserActions.FETCH_USER_DATA),
        concatMap((userData: UserActions.FetchUserData) => {
            let userIdFromStorage = null;
            if (!userData.payload) {
                const authData: {
                    id: string,
                    name: string,
                    token: string,
                    email: string
                } = JSON.parse(localStorage.getItem('authData'));

                userIdFromStorage = authData.id;
            }

            return this.http.get<User>(
                `${environment.apiUrl}/v1/user/${userIdFromStorage ? userIdFromStorage : userData.payload}`
            )
            .pipe(
                map( resData => {
                    if (!userData.payload) {
                        return new UserActions.FetchCurrentUserDataSuccess(resData);
                    } else {
                        return new UserActions.FetchUserDataSuccess(resData);
                    }
                })
            );
        })
    );

    @Effect()
    fetchUserNotifications = this.actions$.pipe(
        ofType(UserActions.FETCH_USER_NOTIFCATIONS),
        switchMap(() => {
            const authData: {
                id: string
            } = JSON.parse(localStorage.getItem('authData'));

            return this.http.get<Notification[]>(
                `${environment.apiUrl}/v1/notifications/${authData.id}`
            ).pipe(
                map( notifcations => {
                    return new UserActions.FetchUserNotificationsSuccess(notifcations.reverse());
                })
            );
        })
    );

    @Effect()
    fetchUserProfileData = this.actions$.pipe(
        ofType(UserActions.FETCH_USER_PROFILE_COLLECTIONS),
        switchMap((userData: UserActions.FetchUserProfileCollections) => {
            return of();
        })
    );

    constructor(
        private actions$: Actions,
        private http: HttpClient,
    ) {}
}
