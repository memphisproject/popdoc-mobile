import { Action } from '@ngrx/store';
import { CollectionOrder } from 'src/app/_models/CollectionOrder';

export const FETCH_COLLECTIONS = '[Collection] Fetch Collections';
export const FETCH_COLLECTIONS_SUCCESS = '[Collection] Fetch Collections Success';
export const FETCH_COLLECTIONS_ORDER = '[Collection] Fetch Collections Order';
export const ORDER_COLLECTIONS = '[Collection] Order Collections';
export const SET_COLLECTIONS = '[Collection] Set Collections';
export const SELECT_COLLECTION = '[Collection] Select Collection';
export const UPDATE_COLLECTION_ORDER = '[Collection] Update Collection Order';
export const OPEN_LAST_SESSION_COLLECTION = '[Collection] Open Last Session Collection';
export const PIN_COLLECTION = '[Collection] Pin Collection';
export const UNPIN_COLLECTION = '[Collection] Unpin Collection';

export class FetchCollections implements Action {
    readonly type = FETCH_COLLECTIONS;
}

export class FetchCollectionsSuccess implements Action {
    readonly type = FETCH_COLLECTIONS_SUCCESS;

    constructor(public payload: [])  {}
}

export class FetchCollectionsOrder implements Action {
    readonly type = FETCH_COLLECTIONS_ORDER;
}

export class OrderCollections implements Action {
    readonly type = ORDER_COLLECTIONS;
}

export class SetCollections implements Action {
    readonly type = SET_COLLECTIONS;

    constructor(public payload: CollectionOrder)  {}
}

export class SelectCollection implements Action {
    readonly type = SELECT_COLLECTION;

    constructor(public payload: string)  {}
}


export class UpdateCollectionOrder implements Action {
    readonly type = UPDATE_COLLECTION_ORDER;

    constructor(public payload: {from: number, to: number})  {}
}

export class OpenLastSessionCollection implements Action {
    readonly type = OPEN_LAST_SESSION_COLLECTION;
}

export class PinCollection implements Action {
    readonly type = PIN_COLLECTION;

    constructor(public payload: string)  {}
}

export type CollectionActions =
    | FetchCollections
    | FetchCollectionsSuccess
    | FetchCollectionsOrder
    | OrderCollections
    | SetCollections
    | SelectCollection
    | OpenLastSessionCollection
    | UpdateCollectionOrder
    | PinCollection;
