import { Action, Reducer } from 'redux';
import { EmployeeTypeActions } from '../actions/_EmployeeTypeActions'
import { EmployeeType } from '../models/_DataModels'

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface EmployeeTypeState {
    reloadData: boolean;
    employeeTypeList: EmployeeType[];  // list that should be rendered in table
}

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: EmployeeTypeState = { 
    employeeTypeList: [], 
    reloadData: true 
};

type KnownAction = EmployeeTypeActions // list of known actions

export const reducer: Reducer<EmployeeTypeState> = (state: EmployeeTypeState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'FETCH_EMPLOYEE_TYPE':
            return {
                employeeTypeList: action.employeeTypeList,
                reloadData: false
            }
        case 'CREATE_EMPLOYEE_TYPE':
            return {
                employeeTypeList: state.employeeTypeList,
                reloadData: true
            }
        case 'UPDATE_EMPLOYEE_TYPE':
            return {
                employeeTypeList: state.employeeTypeList,
                reloadData: true
            }
        case 'DELETE_EMPLOYEE_TYPE':
            return {
                employeeTypeList: state.employeeTypeList,
                reloadData: true
            }
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};