import { Action, Reducer } from 'redux';
import { FetchEmployeeTypeAction } from '../actions/_EmployeeTypeActions'
import { EmployeeActions } from '../actions/_EmployeeActions'

import { Employee, EmployeeType } from '../models/_DataModels'

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface EmployeesState {
    loadingEmployeeList: boolean;
    employeeList: Employee[];
    employeeTypeList: EmployeeType[];
    employeeSelected: Employee;
    reloadEmployees: boolean;
}

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: EmployeesState = { 
    loadingEmployeeList: false,
    employeeList: [], 
    employeeTypeList: [],
    employeeSelected: null,
    reloadEmployees: true,
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
                reloadEmployees: false
            }
        case 'FETCH_EMPLOYEES_SUCCESS':
            return {
                loadingEmployeeList: false,
                employeeList: action.employeeList,
                employeeTypeList: state.employeeTypeList,
                employeeSelected: state.employeeSelected,
                reloadEmployees: false
            }
        case 'FETCH_EMPLOYEE':
            return {
                loadingEmployeeList: state.loadingEmployeeList,
                employeeList: state.employeeList,
                employeeTypeList: state.employeeTypeList,
                employeeSelected: action.employee,
                reloadEmployees: state.reloadEmployees,
            }
        case 'CREATE_EMPLOYEE':
            return {
                loadingEmployeeList: state.loadingEmployeeList,
                employeeList: state.employeeList,
                employeeTypeList: state.employeeTypeList,
                employeeSelected: state.employeeSelected,
                reloadEmployees: true
            }
        case 'UPDATE_EMPLOYEE':
            return {
                loadingEmployeeList: state.loadingEmployeeList,
                employeeList: state.employeeList,
                employeeTypeList: state.employeeTypeList,
                employeeSelected: state.employeeSelected,
                reloadEmployees: true
            }
        case 'UPDATE_EMPLOYEE_FAIL':
            return {
                loadingEmployeeList: state.loadingEmployeeList,
                employeeList: state.employeeList,
                employeeTypeList: state.employeeTypeList,
                employeeSelected: action.employeeSelected,
                reloadEmployees: false
            }
        case 'DELETE_EMPLOYEE':
            return {
                loadingEmployeeList: state.loadingEmployeeList,
                employeeList: state.employeeList,
                employeeTypeList: state.employeeTypeList,
                employeeSelected: state.employeeSelected,
                reloadEmployees: true
            }

        // employee type
        case 'FETCH_EMPLOYEE_TYPE':
            return {
                loadingEmployeeList: state.loadingEmployeeList,
                employeeList: state.employeeList,
                employeeTypeList: action.employeeTypeList,
                employeeSelected: state.employeeSelected,
                reloadEmployees: false
            }
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};