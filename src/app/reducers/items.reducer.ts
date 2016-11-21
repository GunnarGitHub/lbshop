import { ActionReducer, Action } from "@ngrx/store";
import { Item } from '../model'
/*
    Default parameter will be used for initial state unless initial
    state is provided for this reducer in 'provideStore' method.
*/


export const items: ActionReducer<Item[]> = (state: Item[] = [], action: Action) : Item[] => {
    switch (action.type) {
        case 'LOAD_ITEMS':
            console.log("itemsReducer load_items ");
            return action.payload;
        case 'ADD_ITEM':
            return state; //TODO
        case 'DELETE_ITEM':
            return state; //TODO
        case 'CHANGE_ITEM':
            console.log("itemsReducer change_item " + JSON.stringify(action.payload));
            let changedItem = action.payload;
            let newState: Item[] = [];
            state.forEach(value => value.$key === changedItem.key ? newState.push(changedItem) : newState.push(value));
            return newState;
        default:
            return state;
    }
};
