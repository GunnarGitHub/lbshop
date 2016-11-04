import { ActionReducer, Action } from "@ngrx/store";
import { User } from '../model'
/*
    Default parameter will be used for initial state unless initial
    state is provided for this reducer in 'provideStore' method.
*/


export const user: ActionReducer<User> = (state = <User>{}, action: Action) => {
    switch (action.type) {
        case 'ADD_USER':
            return state; //TODO
        case 'DELETE_USER':
            return state; //TODO
/*        case '@ngrx/store/init':
            console.log("UserReducer name ");
            return state;
*/        default:
            return state;
    }
};
