import { Injectable } from '@angular/core';
import * as CollectionActions from './collection.actions';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, switchMap, map, tap} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { CollectionOrder } from 'src/app/_models/CollectionOrder';
import { of } from 'rxjs';

@Injectable()
export class CollectionEffects {

    @Effect()
    fetchCollections = this.actions$.pipe(
        ofType(CollectionActions.FETCH_COLLECTIONS),
        switchMap(() => {
            return this.http.get<[]>(
                `${environment.apiUrl}/v1/mosaics`);
        }),
        map(collections => {
            return new CollectionActions.FetchCollectionsSuccess(collections);
        }),
    );

    @Effect()
    fetchCollection = this.actions$.pipe(
        ofType(CollectionActions.FETCH_COLLECTIONS_SUCCESS),
        map(() => {
            return new CollectionActions.FetchCollectionsOrder();
        })
    );

    @Effect()
    fetchCollectionsOrder = this.actions$.pipe(
        ofType(CollectionActions.FETCH_COLLECTIONS_ORDER),
        switchMap(() => {
            const authData: {
                id: string,
                name: string,
                token: string,
                email: string
            } = JSON.parse(localStorage.getItem('authData'));

            return this.http.get<CollectionOrder>(`${environment.apiUrl}/v1/user/mosaics/order/${authData.id}`);
        }),
        map(collectionOrder => {
            return new CollectionActions.SetCollections(collectionOrder);
        })
    );

    @Effect({dispatch: false})
    selectCollection = this.actions$.pipe(
        ofType(CollectionActions.SELECT_COLLECTION),
        tap((collectionData: CollectionActions.SelectCollection) => {
            localStorage.setItem('lastCollection', JSON.stringify({id: collectionData.payload}));
        })
    );

    @Effect()
    openLastSessionCollection = this.actions$.pipe(
        ofType(CollectionActions.OPEN_LAST_SESSION_COLLECTION),
        map(() => {
            const collection: {
                id: string
            } = JSON.parse(localStorage.getItem('lastCollection'));

            if (!collection) {
                return {type: 'NO ACTION'};
            }
            return new CollectionActions.SelectCollection(collection.id);
        })
    );

    @Effect()
    setCollections = this.actions$.pipe(
        ofType(CollectionActions.SET_COLLECTIONS),
        map(() => {
            return new CollectionActions.OpenLastSessionCollection();
        })
    );

    constructor(
        private actions$: Actions,
        private http: HttpClient
    ) {}
}

