import * as AuthActions from './auth.actions';

export class AuthData {
    constructor(
        public id: string,
        public name: string,
        private token: string,
        public email: string
    )  {}
}

export interface State {
    authData: AuthData;
    authError: string;
    loading: boolean;
}

const initialState = {
    authData: null,
    authError: null,
    loading: false
};

export function authReducer(
    state = initialState,
    action: AuthActions.AuthActions
) {
    switch (action.type) {
        case AuthActions.AUTHENTICATE_SUCCESS:
            const  authData = new AuthData(
                action.payload.id,
                action.payload.name,
                action.payload.token,
                action.payload.email);
            return {
                ...state,
                authData,
                loading: false
            };
        case AuthActions.AUTHENTICATE_FAIL:
            return {
                ...state,
                authError: action.payload,
                loading: false
            };
        case AuthActions.LOGOUT:
            return {
                ...state,
                authData: null
            };
        case AuthActions.LOGIN_START:
            return {
                ...state,
                authError: null,
                loading: true
            };
        default: return state;
    }

}
