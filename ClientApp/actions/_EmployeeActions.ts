import { ActionCreator } from 'redux';
import { AppThunkAction } from '../store/';
import { Employee } from '../models/_DataModels';
import { authHeader } from '../helpers/_authHeader'
import axios from 'axios';

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

export interface FetchManagerEmployeesAction {
    type: 'FETCH_MANAGER_EMPLOYEES';
    employeeList: Employee[];
}

export interface FetchMaintenanceEmployeesAction {
    type: 'FETCH_MAINT_EMPLOYEES';
    employeeList: Employee[];
}

export interface FetchEmployeesActionInProgress {
    type: 'FETCH_EMPLOYEES_IN_PROGRESS';
}

export interface FetchEmployeesActionSuccess {
    type: 'FETCH_EMPLOYEES_SUCCESS';
    employeeList: Employee[];
}

export interface FetchEmployeeAction {
    type: 'FETCH_EMPLOYEE';
    employee: Employee;
}

export interface CreateEmployeeSuccessAction {
    type: 'CREATE_EMPLOYEE_SUCCESS';
    toastId: number;
}

export interface CreateEmployeeFailureAction {
    type: 'CREATE_EMPLOYEE_FAIL';
    toastId: number;
}

export interface UpdateEmployeeActionSuccess {
    type: 'UPDATE_EMPLOYEE_SUCCESS';
    toastId: number;
}

export interface UpdateEmployeeActionFail {
    type: 'UPDATE_EMPLOYEE_FAIL';
    toastId: number;
}

export interface DeleteEmployeeSuccessAction {
    type: 'DELETE_EMPLOYEE_SUCCESS';
    toastId: number;
}

export interface DeleteEmployeeFailureAction {
    type: 'DELETE_EMPLOYEE_FAIL';
    toastId: number;
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).

export type EmployeeActions =  FetchMaintenanceEmployeesAction | FetchManagerEmployeesAction |
    FetchEmployeesActionInProgress | FetchEmployeesActionSuccess |
    FetchEmployeeAction | CreateEmployeeSuccessAction | CreateEmployeeFailureAction | UpdateEmployeeActionSuccess |
    UpdateEmployeeActionFail | DeleteEmployeeSuccessAction | DeleteEmployeeFailureAction;

export type EmployeeProfileActions = FetchEmployeeAction |
    UpdateEmployeeActionSuccess | UpdateEmployeeActionFail;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {

    requestEmployeesList: (): AppThunkAction<EmployeeActions> => (dispatch, getState) => {
        dispatch({ type: 'FETCH_EMPLOYEES_IN_PROGRESS' });
        axios.get(`api/Employee/GetEmployees`)
        .then(response => {
            dispatch({ type: 'FETCH_EMPLOYEES_SUCCESS', employeeList: response.data });
        })
        .catch(error => {
            //
        })
    }, 
    // get all maintenance employees
    requestManagerEmployees: (): AppThunkAction<EmployeeActions> => (dispatch, getState) => {
        axios.get(`api/Employee/GetManagerEmployees`)
        .then(response => {
            dispatch({ type: 'FETCH_MANAGER_EMPLOYEES', employeeList: response.data });
        })
        .catch(error => {
            // error dispatch goes here
        })
    },
    // get all maintenance employees
    requestMaintenanceEmployees: (): AppThunkAction<EmployeeActions> => (dispatch, getState) => {
        axios.get(`api/Employee/GetMaintenanceEmployees`)
        .then(response => {
            dispatch({ type: 'FETCH_MAINT_EMPLOYEES', employeeList: response.data });
        })
        .catch(error => {
            // error dispatch goes here
        })
    },
    // get a single employee by id
    requestEmployee: (id): AppThunkAction<EmployeeActions> => (dispatch, getState) => {
        axios.get(`api/Employee/GetEmployee`, id)
        .then(response => {
            dispatch({ type: 'FETCH_EMPLOYEE', employee: response.data });
        })
        .catch(error => {
            // error dispatch goes here
        })
    },
    // get a single employee who is already logged in
    requestLoggedInEmployee: (): AppThunkAction<EmployeeProfileActions> => (dispatch, getState) => {
        // get id of stored user
        let storedUser = null;
        let employeeId = '';
        if (typeof window !== 'undefined') {
            storedUser = JSON.parse(localStorage.getItem('user'));
        }
        if (storedUser != null && storedUser.employeeType !== 'undefined' ){
            employeeId = storedUser.employeeId;
        } 

        // pass in id as a parameter
        axios.get(`api/Employee/GetEmployee`, {
            params: {
                id: employeeId
            }
        })
        .then(response => {
            dispatch({ type: 'FETCH_EMPLOYEE', employee: response.data });
        })
        .catch(error => {
            // error dispatch goes here
        })
    },
    createNewEmployee: (values, toastId): AppThunkAction<EmployeeActions> => (dispatch, getState) => {
        axios({
            method: 'post',
            url: `api/Employee/CreateNewEmployee`,
            data: values,
            headers: authHeader(),
        })
        .then(response => {
            dispatch({ type: 'CREATE_EMPLOYEE_SUCCESS' , toastId: toastId});
        })
        .catch(error => {
            dispatch({ type: 'CREATE_EMPLOYEE_FAIL', toastId: toastId });
        })
    },
    updateEmployee: (values, toastId): AppThunkAction<EmployeeActions> => (dispatch, getState) => {
        axios({
            method: 'put',
            url: `api/Employee/UpdateEmployee`,
            data: values,
            headers: authHeader(),
        })
        .then(response => {
            dispatch({ type: 'UPDATE_EMPLOYEE_SUCCESS', toastId: toastId });
        })
        .catch(error => {
            dispatch({ type: 'UPDATE_EMPLOYEE_FAIL', toastId: toastId })
        })
    },
    deleteEmployee: (values, toastId): AppThunkAction<EmployeeActions> => (dispatch, getState) => {
        axios({
            method: 'post',
            url: `api/Employee/DeleteEmployee`,
            data: values,
            headers: authHeader(),
        })
        .then(
            response => {
                dispatch({ type: 'DELETE_EMPLOYEE_SUCCESS', toastId: toastId});
            })
        .catch(error => {
                dispatch({type: 'DELETE_EMPLOYEE_FAIL', toastId: toastId})
            })
    },
};

// Individual actions (these are used by functional components) 
// get a single employee by id
export function requestEmployee(id) {
    return axios.get(`api/Employee/GetEmployee`, 
        { params: {
            id: id 
        }})
}

// get multiple employees by array of ids
export function requestEmployees(ids) {
    var params = new URLSearchParams();
    ids.forEach(element => {
        params.append('id', element)
    })

    return axios.get(`api/Employee/GetEmployeesById`, 
        { params: params })
}

