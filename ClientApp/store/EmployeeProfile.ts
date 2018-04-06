import { Action, Reducer } from 'redux';
import { FetchEmployeeTypeAction } from '../actions/_EmployeeTypeActions'
import { EmployeeProfileActions } from '../actions/_EmployeeActions'
import { UserLogoutAction, UserLoggedInCheckAction } from '../actions/_LoginActions'

import { Alert, Employee, EmployeeType } from '../models/_DataModels'

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface EmployeeProfileState {
    employeeTypeList: EmployeeType[];
    employee: Employee;
    reloadEmployee: boolean;
    employeeAlert: Alert;
}

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: EmployeeProfileState = { 
    employeeTypeList: [],
    employee: null,
    reloadEmployee: true,
    employeeAlert: null
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
                employeeAlert: state.employeeAlert
            }
        case 'UPDATE_EMPLOYEE_SUCCESS':
            return {
                employeeTypeList: state.employeeTypeList,
                employee: state.employee,
                reloadEmployee: true,
                employeeAlert: {
                    'toastId': action.toastId,
                    'alertType': 'success',
                    'alertMessage': 'Update Successful'
                },
            }
        case 'UPDATE_EMPLOYEE_FAIL':
            return {
                employeeTypeList: state.employeeTypeList,
                employee: state.employee,
                reloadEmployee: false,
                employeeAlert: {
                    'toastId': action.toastId,
                    'alertType': 'error',
                    'alertMessage': 'Update Failed! Please try again'
                },
            }
        case 'USER_LOGOUT':
            return {
                employeeTypeList: state.employeeTypeList,
                employee: null,
                reloadEmployee: false,
                employeeAlert: state.employeeAlert
            }
        case 'USER_LOGIN_CHECK':
            return {
                employeeTypeList: state.employeeTypeList,
                employee: state.employee,
                reloadEmployee: false,
                employeeAlert: state.employeeAlert
            }

        // employee type
        case 'FETCH_EMPLOYEE_TYPE':
            return {
                employeeTypeList: action.employeeTypeList,
                employee: state.employee,
                reloadEmployee: false,
                loggedIn: false,
                employeeAlert: state.employeeAlert
            }
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};