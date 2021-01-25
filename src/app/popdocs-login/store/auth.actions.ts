import { Action } from '@ngrx/store';

export const AUTO_LOGIN = '[AUTH] Auto Login';
export const LOGIN_START = '[AUTH] Login Start';
export const LOGOUT = '[AUTH] Logout';
export const SIGNUP_START = '[AUTH] Signup Start';
export const AUTHENTICATE_SUCCESS = '[AUTH] Authenticate Success';
export const AUTHENTICATE_FAIL = '[AUTH] Authenticate Fail';

export class AuthenticateSuccess implements Action {
    readonly type = AUTHENTICATE_SUCCESS;

    constructor(public payload: {id: string, name: string, email: string, token: string, redirect: boolean})  {}
}

export class LoginStart implements Action {
    readonly type = LOGIN_START;

    constructor(public payload: {email: string, password: string})  {}
}

export class Logout implements Action {
    readonly type = LOGOUT;
}

export class SignupStart implements Action {
    readonly type = SIGNUP_START;

    constructor()  {}
}

export class AuthenticateFail implements Action {
    readonly type = AUTHENTICATE_FAIL;

    constructor(public payload: string)  {}
}

export class AutoLogin implements Action {
    readonly type = AUTO_LOGIN;

}

export type AuthActions =
    | LoginStart
    | Logout
    | SignupStart
    | AuthenticateSuccess
    | AuthenticateFail
    | AutoLogin;
