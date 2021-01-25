import { Injectable } from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, switchMap, map, tap} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import * as TileActions from './tile.actions';
import { Collection } from 'src/app/_models/Collection';
import { Router } from '@angular/router';

@Injectable()
export class TileEffects {

    @Effect()
    fetchTiles = this.actions$.pipe(
        ofType(TileActions.FETCH_TILES),
        switchMap((tileAction: TileActions.FetchTiles) => {
            return this.http.get<Collection>(`${environment.apiUrl}/v2/mosaic?_id=${tileAction.payload}`);
        }),
        map(collection => {
            //localStorage.setItem(`${collection._id}`, JSON.stringify(collection.things));
            return new TileActions.FetchTilesSuccess(collection.things);
        })
    );

    @Effect({dispatch: false})
    selectTile = this.actions$.pipe(
        ofType(TileActions.SELECT_TILE),
        tap((tileActions: TileActions.SelectTile) => {
            this.router.navigate(['/popdocs/tile']);
        })
    );

    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private router: Router
    ) {}
}

