import { ActionCreator } from 'redux';
import { AppThunkAction } from '../store/';
import { Employee } from '../models/_DataModels';
import axios from 'axios';

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

export interface FetchEmployeesAction {
    type: 'FETCH_EMPLOYEES';
    employeeList: Employee[];
}

export interface CreateEmployeeAction {
    type: 'CREATE_EMPLOYEE';
}

export interface UpdateEmployeeAction {
    type: 'UPDATE_EMPLOYEE';
}

export interface UpdateEmployeeActionFail {
    type: 'UPDATE_EMPLOYEE_FAIL';
    employeeSelected: Employee;
}

export interface DeleteEmployeeAction {
    type: 'DELETE_EMPLOYEE';
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).

export type EmployeeActions =  FetchEmployeesAction | CreateEmployeeAction | UpdateEmployeeAction 
    | UpdateEmployeeActionFail | DeleteEmployeeAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {

    requestEmployeesList: (): AppThunkAction<EmployeeActions> => (dispatch, getState) => {
        axios.get(`api/Employee/GetEmployees`)
        .then(response => {
            dispatch({ type: 'FETCH_EMPLOYEES', employeeList: response.data });
        })
        .catch(error => {
            // error dispatch goes here
        })
    },
    createNewEmployee: (values): AppThunkAction<EmployeeActions> => (dispatch, getState) => {
        axios.post(`api/Employee/CreateNewEmployee`, values)
        .then(response => {
            dispatch({ type: 'CREATE_EMPLOYEE' });
        })
        .catch(error => {
            // error dispatch goes here
        })
    },
    updateEmployee: (values): AppThunkAction<EmployeeActions> => (dispatch, getState) => {
        console.log(values);
        axios.put(`api/Employee/UpdateEmployee`, values)
        .then(response => {
            dispatch({ type: 'UPDATE_EMPLOYEE' });
        })
        .catch(error => {
            dispatch({ type: 'UPDATE_EMPLOYEE_FAIL', employeeSelected: values })
        })
    },
    deleteEmployee: (values): AppThunkAction<EmployeeActions> => (dispatch, getState) => {
        // id is the employeeId
        axios.post(`api/Employee/DeleteEmployee`, values)
        .then(
            response => {
                dispatch({ type: 'DELETE_EMPLOYEE' });
            }
        );
    },
};