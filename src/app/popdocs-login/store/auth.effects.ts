import {Actions, Effect, ofType} from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import {catchError, switchMap, map, tap} from 'rxjs/operators';
import { AuthResponseData } from 'src/app/_models/authResponseData.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { PushNotification } from '@capacitor/core';
import { PushNotificationService } from 'src/app/pushNotificationService';

@Injectable()
export class AuthEffects {
    @Effect()
    authLogin = this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap((authData: AuthActions.LoginStart) =>  {
            return this.http.post<AuthResponseData>(
                `${environment.apiUrl}/v1/signin`,
                {
                    email: authData.payload.email,
                    password: authData.payload.password
                })
            .pipe(
                map( resData => {
                    return this.handleAuthentication(resData._id, resData.name, resData.token, resData.email);
                }),
                catchError(errorRes => {
                    return of(new AuthActions.AuthenticateFail(errorRes.error.message));
                }),
            );
        })
    );

    @Effect({dispatch: false})
    authSuccess = this.actions$.pipe(
        ofType(AuthActions.AUTHENTICATE_SUCCESS),
        tap((authData: AuthActions.AuthenticateSuccess) => {
           if (authData.payload.redirect) {
            this.router.navigate(['/popdocs/collection']);
           }
        })
    );

    @Effect({dispatch: false})
    authLogout = this.actions$.pipe(
        ofType(AuthActions.LOGOUT),
        tap(() => {
            localStorage.removeItem('authData');
            localStorage.removeItem('lastCollection');
            this.router.navigate(['/popdocs/login']);

            if (this.platform.is('ios')) {
                NativeStorage.remove('currentUser')
                    .then(
                        () => console.log('Removed item!'),
                        error => console.log('Error removing item', error)
                    );
            }
        })
    );

    @Effect()
    autoLogin = this.actions$.pipe(
        ofType(AuthActions.AUTO_LOGIN),
        map(() => {
            const authData: {
                id: string,
                name: string,
                token: string,
                email: string
            } = JSON.parse(localStorage.getItem('authData'));


            if (!authData) {
                return {type: 'NO ACTION'};
            }

            if (authData.token) {
                return new AuthActions.AuthenticateSuccess({
                    id: authData.id,
                    name: authData.name,
                    token: authData.token,
                    email: authData.email,
                    redirect: false
                });
            }
            return {type: 'NO ACTION'};
        })
    );

    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private router: Router,
        private platform: Platform,
        private pushNotificationService: PushNotificationService
    ) {}


    private handleAuthentication = (id: string, name: string, token: string, email: string) => {
        localStorage.setItem('authData', JSON.stringify({id, name, token, email}));
        if (this.platform.is('ios')) {
            NativeStorage.initWithSuiteName(environment.iosGroup);
            NativeStorage.setItem('currentUser', {id, name, token, email})
                .then(
                    () => console.log('Stored item!'),
                    error => console.log(`Error storing item - ${{id, name, token, email}} -> ${error}`)
                );
            this.saveDeviceToken(id);
        }
        return new AuthActions.AuthenticateSuccess({id, name, token, email, redirect: true});
    }

    saveDeviceToken(userId) {
        this.http.post(`${environment.apiUrl}/v1/user/deviceToken`, {
             deviceToken: this.pushNotificationService.deviceToken,
             userId
        }).subscribe();
    }
}
