import { ActionReducer, Action } from "@ngrx/store";
import { Shop } from '../model'
/*
    Default parameter will be used for initial state unless initial
    state is provided for this reducer in 'provideStore' method.
*/


export const shops: ActionReducer<Shop[]> = (state: Shop[] = [], action: Action) : Shop[] => {
    switch (action.type) {
        case 'LOAD_SHOPS':
            console.log("shopsReducer load_shops ");
            return action.payload;
        case 'ADD_SHOP':
            return state; //TODO
        case 'DELETE_SHOP':
            return state; //TODO
        default:
            return state;
    }
};
