import { Tile } from 'src/app/_models/Tile';
import * as TileActions from './tile.actions';

export interface State {
    tileCache: {};
    collectionTiles: Tile[];
    selectedTile: Tile;
    loading: boolean;
}

const initialState = {
    tileCache: null,
    collectionTiles: null,
    selectedTile: null,
    loading: false,
};

export function tileReducer(
    state = initialState,
    action: TileActions.TileActions
) {
    switch (action.type) {
        case TileActions.FETCH_TILES:
            return {
                ...state,
                loading: true,
            };
        case TileActions.UPDATE_TILE_ORDER:
            const newOrderedArray = state.collectionTiles.map(el => el);
            const element = newOrderedArray[action.payload.from];
            newOrderedArray.splice(action.payload.from, 1);
            newOrderedArray.splice(action.payload.to, 0, element);


            return {
                ...state,
                collectionTiles: newOrderedArray,
            };
        case TileActions.FETCH_TILES_SUCCESS:
            return {
                ...state,
                collectionTiles: action.payload,
                loading: false,
            };
        case TileActions.SELECT_TILE:
            const selectedTile = state.collectionTiles.filter(tile => {
                if (tile._id === action.payload){
                    return tile;
                }
            });

            return {
                ...state,
                selectedTile: selectedTile[0]
            };
        default: return state;
    }
}
