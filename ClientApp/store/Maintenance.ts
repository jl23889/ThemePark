import { Action, Reducer } from 'redux';
import { MaintenanceActions } from '../actions/_MaintenanceActions'
import { FetchManagerEmployeesAction,
    FetchMaintenanceEmployeesAction } from '../actions/_EmployeeActions'
import { FetchRidesActionSuccess } from '../actions/_RideActions'

import { Alert, Employee, Maintenance, Ride } from '../models/_DataModels'

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface MaintenanceState {
    loadingMaintenanceList: boolean;
    maintenanceList: Maintenance[];
    rideList: Ride[];
    managerEmployeeList: Employee[];
    maintenanceEmployeeList: Employee[];
    reloadMaintenanceList: boolean;
    maintenanceAlert: Alert;
}

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: MaintenanceState = { 
    loadingMaintenanceList: false,
    maintenanceList: [],
    rideList: [],
    managerEmployeeList: [],
    maintenanceEmployeeList: [],
    reloadMaintenanceList: true,
    maintenanceAlert: null
};

type KnownAction = MaintenanceActions | 
    FetchManagerEmployeesAction | FetchMaintenanceEmployeesAction | FetchRidesActionSuccess;

export const reducer: Reducer<MaintenanceState> = (state: MaintenanceState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'FETCH_MAINT_EMPLOYEES':
            return {
                loadingMaintenanceList: state.loadingMaintenanceList,
                maintenanceList: state.maintenanceList,
                rideList: state.rideList,
                managerEmployeeList: state.managerEmployeeList,
                maintenanceEmployeeList: action.employeeList,
                reloadMaintenanceList: false,
                maintenanceAlert: state.maintenanceAlert,
            }
        case 'FETCH_MANAGER_EMPLOYEES':
            return {
                loadingMaintenanceList: state.loadingMaintenanceList,
                maintenanceList: state.maintenanceList,
                rideList: state.rideList,
                managerEmployeeList: action.employeeList,
                maintenanceEmployeeList: state.maintenanceEmployeeList,
                reloadMaintenanceList: false,
                maintenanceAlert: state.maintenanceAlert,
            }
        case 'FETCH_RIDES_SUCCESS':
            return {
                loadingMaintenanceList: state.loadingMaintenanceList,
                maintenanceList: state.maintenanceList,
                rideList: action.rideList,
                managerEmployeeList: state.managerEmployeeList,
                maintenanceEmployeeList: state.maintenanceEmployeeList,
                reloadMaintenanceList: false,
                maintenanceAlert: state.maintenanceAlert,
            }

        case 'FETCH_MAINTS_IN_PROGRESS':
            return {
                loadingMaintenanceList: true,
                maintenanceList: state.maintenanceList,
                rideList: state.rideList,
                managerEmployeeList: state.managerEmployeeList,
                maintenanceEmployeeList: state.maintenanceEmployeeList,
                reloadMaintenanceList: false,
                maintenanceAlert: state.maintenanceAlert,
            }
        case 'FETCH_MAINTS_SUCCESS':
            return {
                loadingMaintenanceList: false,
                maintenanceList: action.maintenanceList,
                rideList: state.rideList,
                managerEmployeeList: state.managerEmployeeList,
                maintenanceEmployeeList: state.maintenanceEmployeeList,
                reloadMaintenanceList: false,
                maintenanceAlert: state.maintenanceAlert
            }
        case 'FETCH_MAINTS_FAIL':
            return {
                loadingMaintenanceList: false,
                maintenanceList: state.maintenanceList,
                rideList: state.rideList,
                managerEmployeeList: state.managerEmployeeList,
                maintenanceEmployeeList: state.maintenanceEmployeeList,
                reloadMaintenanceList: false,
                maintenanceAlert: state.maintenanceAlert
            }
        case 'CREATE_MAINT_IN_PROGRESS':
            return {
                loadingMaintenanceList: state.loadingMaintenanceList,
                maintenanceList: state.maintenanceList,
                rideList: state.rideList,
                managerEmployeeList: state.managerEmployeeList,
                maintenanceEmployeeList: state.maintenanceEmployeeList,
                reloadMaintenanceList: false,
                maintenanceAlert: state.maintenanceAlert,
            }
        case 'CREATE_MAINT_SUCCESS':
            return {
                loadingMaintenanceList: state.loadingMaintenanceList,
                maintenanceList: state.maintenanceList,
                rideList: state.rideList,
                managerEmployeeList: state.managerEmployeeList,
                maintenanceEmployeeList: state.maintenanceEmployeeList,
                reloadMaintenanceList: true,
                maintenanceAlert: {
                    'toastId': action.toastId,
                    'alertType': 'success',
                    'alertMessage': 'Create Successful'
                },
            }
        case 'CREATE_MAINT_FAIL':
            return {
                loadingMaintenanceList: state.loadingMaintenanceList,
                maintenanceList: state.maintenanceList,
                rideList: state.rideList,
                managerEmployeeList: state.managerEmployeeList,
                maintenanceEmployeeList: state.maintenanceEmployeeList,
                reloadMaintenanceList: false,
                maintenanceAlert: {
                    'toastId': action.toastId,
                    'alertType': 'error',
                    'alertMessage': 'Create Failed! Please try again'
                },
            }
        case 'UPDATE_MAINT_IN_PROGRESS':
            return {
                loadingMaintenanceList: state.loadingMaintenanceList,
                maintenanceList: state.maintenanceList,
                rideList: state.rideList,
                managerEmployeeList: state.managerEmployeeList,
                maintenanceEmployeeList: state.maintenanceEmployeeList,
                reloadMaintenanceList: false,
                maintenanceAlert: state.maintenanceAlert,
            }
        case 'UPDATE_MAINT_SUCCESS':
            return {
                loadingMaintenanceList: state.loadingMaintenanceList,
                maintenanceList: state.maintenanceList,
                rideList: state.rideList,
                managerEmployeeList: state.managerEmployeeList,
                maintenanceEmployeeList: state.maintenanceEmployeeList,
                reloadMaintenanceList: true,
                maintenanceAlert: {
                    'toastId': action.toastId,
                    'alertType': 'success',
                    'alertMessage': 'Update Successful'
                },
            }
        case 'UPDATE_MAINT_FAIL':
            return {
                loadingMaintenanceList: state.loadingMaintenanceList,
                maintenanceList: state.maintenanceList,
                rideList: state.rideList,
                managerEmployeeList: state.managerEmployeeList,
                maintenanceEmployeeList: state.maintenanceEmployeeList,
                reloadMaintenanceList: false,
                maintenanceAlert: {
                    'toastId': action.toastId,
                    'alertType': 'error',
                    'alertMessage': 'Update Failed! Please try again'
                },
            }
        case 'DELETE_MAINT_IN_PROGRESS':
            return {
                loadingMaintenanceList: state.loadingMaintenanceList,
                maintenanceList: state.maintenanceList,
                rideList: state.rideList,
                managerEmployeeList: state.managerEmployeeList,
                maintenanceEmployeeList: state.maintenanceEmployeeList,
                reloadMaintenanceList: false,
                maintenanceAlert: state.maintenanceAlert,
            }    
        case 'DELETE_MAINT_SUCCESS':
            return {
                loadingMaintenanceList: state.loadingMaintenanceList,
                maintenanceList: state.maintenanceList,
                rideList: state.rideList,
                managerEmployeeList: state.managerEmployeeList,
                maintenanceEmployeeList: state.maintenanceEmployeeList,
                reloadMaintenanceList: true,
                maintenanceAlert: {
                    'toastId': action.toastId,
                    'alertType': 'success',
                    'alertMessage': 'Delete Successful'
                },
            }
        case 'DELETE_MAINT_FAIL':
            return {
                loadingMaintenanceList: state.loadingMaintenanceList,
                maintenanceList: state.maintenanceList,
                rideList: state.rideList,
                managerEmployeeList: state.managerEmployeeList,
                maintenanceEmployeeList: state.maintenanceEmployeeList,
                reloadMaintenanceList: false,
                maintenanceAlert: {
                    'toastId': action.toastId,
                    'alertType': 'error',
                    'alertMessage': 'Delete Failed! Please try again'
                },       
            }
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};