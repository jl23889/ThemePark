import { Action, Reducer } from 'redux';
import { FetchEmployeeTypeAction } from '../actions/_EmployeeTypeActions'
import { EmployeeProfileActions } from '../actions/_EmployeeActions'
import { UserLogoutAction, UserLoggedInCheckAction } from '../actions/_LoginActions'

import { Employee, EmployeeType } from '../models/_DataModels'

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface EmployeeProfileState {
    employeeTypeList: EmployeeType[];
    employee: Employee;
    reloadEmployee: boolean;
}

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: EmployeeProfileState = { 
    employeeTypeList: [],
    employee: null,
    reloadEmployee: true,
};

type KnownAction = EmployeeProfileActions | FetchEmployeeTypeAction | 
    UserLogoutAction | UserLoggedInCheckAction;

export const reducer: Reducer<EmployeeProfileState> = (state: EmployeeProfileState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        // employees
        case 'FETCH_EMPLOYEE':
            return {
                employeeTypeList: state.employeeTypeList,
                employee: action.employee,
                reloadEmployee: false,
            }
        case 'UPDATE_EMPLOYEE':
            return {
                employeeTypeList: state.employeeTypeList,
                employee: state.employee,
                reloadEmployee: true,
            }
        case 'UPDATE_EMPLOYEE_FAIL':
            return {
                employeeTypeList: state.employeeTypeList,
                employee: state.employee,
                reloadEmployee: false,
            }
        case 'USER_LOGOUT':
            return {
                employeeTypeList: state.employeeTypeList,
                employee: null,
                reloadEmployee: false,
            }
        case 'USER_LOGIN_CHECK':
            return {
                employeeTypeList: state.employeeTypeList,
                employee: state.employee,
                reloadEmployee: false,
            }

        // employee type
        case 'FETCH_EMPLOYEE_TYPE':
            return {
                employeeTypeList: action.employeeTypeList,
                employee: state.employee,
                reloadEmployee: false,
                loggedIn: false,
            }
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};