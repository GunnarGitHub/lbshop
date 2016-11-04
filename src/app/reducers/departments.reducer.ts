import { ActionReducer, Action } from "@ngrx/store";
import { Department } from '../model'
/*
    Default parameter will be used for initial state unless initial
    state is provided for this reducer in 'provideStore' method.
*/


export const departments: ActionReducer<Department[]> = (state: Department[] = [], action: Action) : Department[] => {
    switch (action.type) {
        case 'LOAD_DEPARTMENTS':
            console.log("departmentsReducer load_departments ");
            return action.payload;
        case 'ADD_DEPARTMENT':
            return state; //TODO
        case 'DELETE_DEPARTMENT':
            return state; //TODO
        case 'CHANGE_DEPARTMENT':
            console.log("departmentsReducer change_department ");
            return action.payload;
        default:
            return state;
    }
};
