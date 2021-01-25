import { Action } from '@ngrx/store';
import { Tile } from 'src/app/_models/Tile';

export const FETCH_TILES = '[Tile] Fetch Tiles';
export const FETCH_TILES_SUCCESS = '[Tile] Fetch Tiles Success';
export const SELECT_TILE = '[Tile] Select Tile';
export const UPDATE_TILE_ORDER = '[Tile] Update Tile Order';


export class FetchTiles implements Action {
    readonly type = FETCH_TILES;

    constructor(public payload: string)  {}
}

export class FetchTilesSuccess implements Action {
    readonly type = FETCH_TILES_SUCCESS;

    constructor(public payload: Tile[])  {}
}

export class SelectTile implements Action {
    readonly type = SELECT_TILE;

    constructor(public payload: string)  {}
}

export class UpdateTilesOrder implements Action {
    readonly type = UPDATE_TILE_ORDER;

    constructor(public payload: {from: number, to: number})  {}
}


export type TileActions =
    | FetchTiles
    | UpdateTilesOrder
    | FetchTilesSuccess
    | SelectTile;
