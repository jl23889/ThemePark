import { ActionCreator } from 'redux';
import { AppThunkAction } from '../store/';
import { EmployeeType } from '../models/_DataModels'
import axios from 'axios';

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

export interface UserLoginAction {
    type: 'USER_LOGIN';
    employeeTypeList: EmployeeType[];
}

export interface UserLogoutAction {
    type: 'USER_LOGOUT_TYPE';
}

export interface UpdateEmployeeTypeAction {
    type: 'UPDATE_EMPLOYEE_TYPE';
}

export interface DeleteEmployeeTypeAction {
    type: 'DELETE_EMPLOYEE_TYPE';
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
export type EmployeeTypeActions =  FetchEmployeeTypeAction | CreateEmployeeTypeAction
    | UpdateEmployeeTypeAction | DeleteEmployeeTypeAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    requestEmployeeTypeList: (): AppThunkAction<EmployeeTypeActions> => (dispatch, getState) => {
        // Only load data if reload flag is true
        if (getState().employeeType.reloadData) {
            axios.get(`api/EmployeeType/LookUpEmployeeType`)
            .then(response => {
                dispatch({ type: 'FETCH_EMPLOYEE_TYPE', employeeTypeList: response.data });
            })
        }
    },
    createNewEmployeeType: (values): AppThunkAction<EmployeeTypeActions> => (dispatch, getState) => {
        axios.post(`api/EmployeeType/CreateNewEmployeeType`, values)
        .then(
            response => {
                dispatch({ type: 'CREATE_EMPLOYEE_TYPE' });
            }
        );
    },
    updateEmployeeType: (values): AppThunkAction<EmployeeTypeActions> => (dispatch, getState) => {
        axios.put(`api/EmployeeType/UpdateEmployeeType`, values)
        .then(
            response => {
                dispatch({ type: 'UPDATE_EMPLOYEE_TYPE' });
            }
        );
    },
    deleteEmployeeType: (values): AppThunkAction<EmployeeTypeActions> => (dispatch, getState) => {
        // id is the employeeTypeId
        axios.post(`api/EmployeeType/DeleteEmployeeType`, values)
        .then(
            response => {
                dispatch({ type: 'DELETE_EMPLOYEE_TYPE' });
            }
        );
    }
};
