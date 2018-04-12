import { Action, Reducer } from 'redux';
import { FetchEmployeeTypeAction } from '../actions/_EmployeeTypeActions'
import { EmployeeActions } from '../actions/_EmployeeActions'

import { Alert, Employee, EmployeeType } from '../models/_DataModels'

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface EmployeesState {
    loadingEmployeeList: boolean;
    employeeList: Employee[];
    employeeTypeList: EmployeeType[];
    employeeSelected: Employee;
    reloadEmployees: boolean;
    employeeAlert: Alert;
}

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: EmployeesState = { 
    loadingEmployeeList: false,
    employeeList: [], 
    employeeTypeList: [],
    employeeSelected: null,
    reloadEmployees: true,
    employeeAlert: null,

};

type KnownAction = EmployeeActions | FetchEmployeeTypeAction;

export const reducer: Reducer<EmployeesState> = (state: EmployeesState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {

        // employees
        case 'FETCH_EMPLOYEES_IN_PROGRESS':
            return {
                loadingEmployeeList: true,
                employeeList: state.employeeList,
                employeeTypeList: state.employeeTypeList,
                employeeSelected: state.employeeSelected,
                reloadEmployees: false,
                employeeAlert: state.employeeAlert,
            }

        case 'FETCH_EMPLOYEES_SUCCESS':
            return {
                loadingEmployeeList: false,
                employeeList: action.employeeList,
                employeeTypeList: state.employeeTypeList,
                employeeSelected: state.employeeSelected,
                reloadEmployees: false,
                employeeAlert: state.employeeAlert,
            }
        case 'FETCH_MAINT_EMPLOYEES':
            return {
                loadingEmployeeList: state.loadingEmployeeList,
                employeeList: action.employeeList,
                employeeTypeList: state.employeeTypeList,
                employeeSelected: state.employeeSelected,
                reloadEmployees: state.reloadEmployees,
                employeeAlert: state.employeeAlert,
            }

        case 'FETCH_EMPLOYEE':
            return {
                loadingEmployeeList: state.loadingEmployeeList,
                employeeList: state.employeeList,
                employeeTypeList: state.employeeTypeList,
                employeeSelected: action.employee,
                reloadEmployees: state.reloadEmployees,
                employeeAlert: state.employeeAlert,
            }

        case 'CREATE_EMPLOYEE_SUCCESS':
            return {
                loadingEmployeeList: state.loadingEmployeeList,
                employeeList: state.employeeList,
                employeeTypeList: state.employeeTypeList,
                employeeSelected: state.employeeSelected,
                reloadEmployees: true,
                employeeAlert: {
                    'toastId': action.toastId,
                    'alertType': 'success',
                    'alertMessage': 'Created Employee Successfully'
                },

            }

        case 'CREATE_EMPLOYEE_FAIL':
            return {
                loadingEmployeeList: state.loadingEmployeeList,
                employeeList: state.employeeList,
                employeeTypeList: state.employeeTypeList,
                employeeSelected: state.employeeSelected,
                reloadEmployees: true,
                employeeAlert: {
                    'toastId': action.toastId,
                    'alertType': 'error',
                    'alertMessage': 'COuld not create Employee. Please Try Again!'
                },

            }

        case 'UPDATE_EMPLOYEE_SUCCESS':
            return {
                loadingEmployeeList: state.loadingEmployeeList,
                employeeList: state.employeeList,
                employeeTypeList: state.employeeTypeList,
                employeeSelected: state.employeeSelected,
                reloadEmployees: true,
                employeeAlert: {
                    'toastId': action.toastId,
                    'alertType': 'success',
                    'alertMessage': 'Update Successful'
                },
            }
        case 'UPDATE_EMPLOYEE_FAIL':
            return {
                loadingEmployeeList: state.loadingEmployeeList,
                employeeList: state.employeeList,
                employeeTypeList: state.employeeTypeList,
                employeeSelected: state.employeeSelected,
                reloadEmployees: false,
                employeeAlert: {
                    'toastId': action.toastId,
                    'alertType': 'error',
                    'alertMessage': 'Update Failed! Please try again'
                },
            }
        case 'DELETE_EMPLOYEE_SUCCESS':
            return {
                loadingEmployeeList: state.loadingEmployeeList,
                employeeList: state.employeeList,
                employeeTypeList: state.employeeTypeList,
                employeeSelected: state.employeeSelected,
                reloadEmployees: true,
                employeeAlert: {
                    'toastId': action.toastId,
                    'alertType': 'success',
                    'alertMessage': 'Deleted Employee!'
                },
            }

        case 'DELETE_EMPLOYEE_FAIL':
            return {
                loadingEmployeeList: state.loadingEmployeeList,
                employeeList: state.employeeList,
                employeeTypeList: state.employeeTypeList,
                employeeSelected: state.employeeSelected,
                reloadEmployees: true,
                employeeAlert: {
                    'toastId': action.toastId,
                    'alertType': 'error',
                    'alertMessage': 'Could not delete employee. Try again!'
                },
            }

        // employee type
        case 'FETCH_EMPLOYEE_TYPE':
            return {
                loadingEmployeeList: state.loadingEmployeeList,
                employeeList: state.employeeList,
                employeeTypeList: action.employeeTypeList,
                employeeSelected: state.employeeSelected,
                reloadEmployees: false,
                employeeAlert: state.employeeAlert,
            }
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};