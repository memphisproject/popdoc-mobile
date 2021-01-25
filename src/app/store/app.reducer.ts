import { ActionReducerMap } from '@ngrx/store';
import * as fromAuth from '../popdocs-login/store/auth.reducer';
import * as fromCollection from '../popdocs-collection/store/collection.reducer';
import * as fromTile from '../popdocs-tile/store/tile.reducer';
import * as fromUser from '../popdocs-user-profile/store/user.reducer';

export interface AppState {
    auth: fromAuth.State;
    collections: fromCollection.State;
    tile: fromTile.State;
    user: fromUser.State;
}

export const appReducer: ActionReducerMap<AppState> =  {
    auth: fromAuth.authReducer,
    collections: fromCollection.collectionReducer,
    tile: fromTile.tileReducer,
    user: fromUser.userReducer,
};

