import { ActionReducer, Action } from "@ngrx/store";
import { Shop } from '../model'
/*
    Default parameter will be used for initial state unless initial
    state is provided for this reducer in 'provideStore' method.
*/


export const shop: ActionReducer<Shop> = (state: Shop, action: Action) : Shop => {
    switch (action.type) {
        case 'CHANGE_SHOP': 
            console.log("shopReducer change_shop " );
            let shop = Object.assign({}, action.payload);
            return shop;
        default:
            return state;
    }
};
