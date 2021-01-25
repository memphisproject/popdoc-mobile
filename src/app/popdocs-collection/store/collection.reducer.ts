import { Collection } from 'src/app/_models/Collection';
import { CollectionOrder } from 'src/app/_models/CollectionOrder';
import * as CollectionActions from './collection.actions';

export interface State {
    collectionOrder: CollectionOrder;
    activeCollections: Collection[];
    discoveredCollections: Collection[];
    selectedCollection: Collection;
    pinnedCollections: Collection[];
    loading: boolean;
    collectionList: [];
}

const initialState = {
    collectionOrder: null,
    activeCollections: null,
    discoveredCollections: null,
    selectedCollection: null,
    pinnedCollections: null,
    loading: false,
    collectionList: null
};

export function collectionReducer(
    state = initialState,
    action: CollectionActions.CollectionActions
) {
    switch (action.type) {
        case CollectionActions.FETCH_COLLECTIONS:
            return {
                ...state,
                loading: true
            };
        case CollectionActions.FETCH_COLLECTIONS_SUCCESS:
                return {
                    ...state,
                    loading: true,
                    collectionList: action.payload
                };
        case CollectionActions.FETCH_COLLECTIONS_ORDER:
                return {
                    ...state,
                    loading: true,
                };

        case CollectionActions.SET_COLLECTIONS:
            const collectionOrder = action.payload;
            const activeCollectionsOrdered = [];
            const discoveredCollectionsOrdered = [];


            collectionOrder.active.forEach(orderElement => {
                activeCollectionsOrdered.push(state.collectionList[orderElement]);
            });

            collectionOrder.discovered.forEach(orderElement => {
                discoveredCollectionsOrdered.push(state.collectionList[orderElement]);
            });

            return {
                ...state,
                loading: false,
                collectionOrder,
                activeCollections: activeCollectionsOrdered,
                discoveredCollections: discoveredCollectionsOrdered,
            };
        case CollectionActions.SELECT_COLLECTION:
            return {
                ...state,
                selectedCollection: state.collectionList[action.payload]
            };

        case CollectionActions.UPDATE_COLLECTION_ORDER:
            const newOrderedArray = state.activeCollections.map(el => el);
            const element = newOrderedArray[action.payload.from];
            newOrderedArray.splice(action.payload.from, 1);
            newOrderedArray.splice(action.payload.to, 0, element);

            return {
                ...state,
                activeCollections: newOrderedArray
            };
        case CollectionActions.PIN_COLLECTION:
            const newPinnedCollections: Collection[] = state.pinnedCollections ? [ ...state.pinnedCollections ] : [];
            newPinnedCollections.push(state.selectedCollection);

            return {
                ...state,
                pinnedCollections: newPinnedCollections
            };
        default:
            return state;
    }
}
