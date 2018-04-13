import { Action, Reducer } from 'redux';
import { FetchRideStatusAction } from '../actions/_RideStatusActions'
import { FetchRideTypeAction } from '../actions/_RideTypeActions'
import { RideActions } from '../actions/_RideActions'
import { FetchManagerEmployeesAction, 
    FetchRideEmployeesAction } from '../actions/_EmployeeActions'

import { Alert, Employee, Ride, RideStatus, RideType } from '../models/_DataModels'

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface RidesState {
    loadingRideList: boolean;
    rideList: Ride[];
    rideStatusList: RideStatus[];
    rideTypeList: RideType[];
    managerEmployeeList: Employee[],
    rideEmployeeList: Employee[],
    rideSelected: Ride;
    reloadRides: boolean;
    rideAlert: Alert,
}

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: RidesState = { 
    loadingRideList: false,
    rideList: [], 
    rideStatusList: [],
    rideTypeList: [],
    managerEmployeeList: [],
    rideEmployeeList: [],
    rideSelected: null,
    reloadRides: true,
    rideAlert: null,
};

type KnownAction = RideActions |
    FetchManagerEmployeesAction | FetchRideEmployeesAction | FetchRideStatusAction | FetchRideTypeAction;

export const reducer: Reducer<RidesState> = (state: RidesState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        // rides
        case 'FETCH_RIDE_EMPLOYEES':
            return {
                loadingRideList: state.loadingRideList,
                rideList: state.rideList,
                rideStatusList: state.rideStatusList,
                rideTypeList: state.rideTypeList,
                managerEmployeeList: state.managerEmployeeList,
                rideEmployeeList: action.employeeList,
                rideSelected: state.rideSelected,
                reloadRides: state.reloadRides,
                rideAlert: state.rideAlert,
            }
        case 'FETCH_MANAGER_EMPLOYEES':
            return {
                loadingRideList: state.loadingRideList,
                rideList: state.rideList,
                rideStatusList: state.rideStatusList,
                rideTypeList: state.rideTypeList,
                managerEmployeeList: action.employeeList,
                rideEmployeeList: state.rideEmployeeList,
                rideSelected: state.rideSelected,
                reloadRides: state.reloadRides,
                rideAlert: state.rideAlert,
            }

        case 'FETCH_RIDES_IN_PROGRESS':
            return {
                loadingRideList: true,
                rideList: state.rideList,
                rideStatusList: state.rideStatusList,
                rideTypeList: state.rideTypeList,
                managerEmployeeList: state.managerEmployeeList,
                rideEmployeeList: state.rideEmployeeList,
                rideSelected: state.rideSelected,
                reloadRides: false,
                rideAlert: state.rideAlert,
            }
        case 'FETCH_RIDES_SUCCESS':
            return {
                loadingRideList: false,
                rideList: action.rideList,
                rideStatusList: state.rideStatusList,
                rideTypeList: state.rideTypeList,
                managerEmployeeList: state.managerEmployeeList,
                rideEmployeeList: state.rideEmployeeList,
                rideSelected: state.rideSelected,
                reloadRides: false,
                rideAlert: state.rideAlert,
            }
        case 'FETCH_RIDE_SUCCESS':
            return {
                loadingRideList: state.loadingRideList,
                rideList: state.rideList,
                rideStatusList: state.rideStatusList,
                rideTypeList: state.rideTypeList,
                managerEmployeeList: state.managerEmployeeList,
                rideEmployeeList: state.rideEmployeeList,
                rideSelected: state.rideSelected,
                reloadRides: state.reloadRides,
                rideAlert: state.rideAlert,
            }
        case 'CREATE_RIDE_SUCCESS':
            return {
                loadingRideList: state.loadingRideList,
                rideList: state.rideList,
                rideStatusList: state.rideStatusList,
                rideTypeList: state.rideTypeList,
                managerEmployeeList: state.managerEmployeeList,
                rideEmployeeList: state.rideEmployeeList,
                rideSelected: state.rideSelected,
                reloadRides: true,
                rideAlert: {
                    'toastId': action.toastId,
                    'alertType': 'success',
                    'alertMessage': 'Created Ride Successfully'
                },
            }

        case 'CREATE_RIDE_FAIL':
            return {
                loadingRideList: state.loadingRideList,
                rideList: state.rideList,
                rideStatusList: state.rideStatusList,
                rideTypeList: state.rideTypeList,
                managerEmployeeList: state.managerEmployeeList,
                rideEmployeeList: state.rideEmployeeList,
                rideSelected: state.rideSelected,
                reloadRides: true,
                rideAlert: {
                    'toastId': action.toastId,
                    'alertType': 'error',
                    'alertMessage': 'Could not create ride. Please try again!'
                },
            }
        case 'UPDATE_RIDE_SUCCESS':
            return {
                loadingRideList: state.loadingRideList,
                rideList: state.rideList,
                rideStatusList: state.rideStatusList,
                rideTypeList: state.rideTypeList,
                managerEmployeeList: state.managerEmployeeList,
                rideEmployeeList: state.rideEmployeeList,
                rideSelected: state.rideSelected,
                reloadRides: true,
                rideAlert: {
                    'toastId': action.toastId,
                    'alertType': 'success',
                    'alertMessage': 'Updated Ride Successfully'
                },
            }
        case 'UPDATE_RIDE_FAIL':
            return {
                loadingRideList: state.loadingRideList,
                rideList: state.rideList,
                rideStatusList: state.rideStatusList,
                rideTypeList: state.rideTypeList,
                managerEmployeeList: state.managerEmployeeList,
                rideEmployeeList: state.rideEmployeeList,
                rideSelected: action.rideSelected,
                reloadRides: false,
                rideAlert: {
                    'toastId': action.toastId,
                    'alertType': 'error',
                    'alertMessage': 'Could not update ride. Please try again!'
                },
            }
        case 'DELETE_RIDE_SUCCESS':
            return {
                loadingRideList: state.loadingRideList,
                rideList: state.rideList,
                rideStatusList: state.rideStatusList,
                rideTypeList: state.rideTypeList,
                managerEmployeeList: state.managerEmployeeList,
                rideEmployeeList: state.rideEmployeeList,
                rideSelected: state.rideSelected,
                reloadRides: true,
                rideAlert: {
                    'toastId': action.toastId,
                    'alertType': 'success',
                    'alertMessage': 'Deleted Ride Successfully!'
                },
            }    
        case 'DELETE_RIDE_FAIL':
            return {
                loadingRideList: state.loadingRideList,
                rideList: state.rideList,
                rideStatusList: state.rideStatusList,
                rideTypeList: state.rideTypeList,
                managerEmployeeList: state.managerEmployeeList,
                rideEmployeeList: state.rideEmployeeList,
                rideSelected: state.rideSelected,
                reloadRides: true,
                rideAlert: {
                    'toastId': action.toastId,
                    'alertType': 'error',
                    'alertMessage': 'Could not update ride. Please try again!'
                },
            } 

        // ride status
        case 'FETCH_RIDE_STATUS':
            return {
                loadingRideList: state.loadingRideList,
                rideList: state.rideList,
                rideStatusList: action.rideStatusList,
                rideTypeList: state.rideTypeList,
                managerEmployeeList: state.managerEmployeeList,
                rideEmployeeList: state.rideEmployeeList,
                rideSelected: state.rideSelected,
                reloadRides: false,
                rideAlert: state.rideAlert,
            }

        // ride type
        case 'FETCH_RIDE_TYPE':
            return {
                loadingRideList: state.loadingRideList,
                rideList: state.rideList,
                rideStatusList: state.rideStatusList,
                rideTypeList: action.rideTypeList,
                managerEmployeeList: state.managerEmployeeList,
                rideEmployeeList: state.rideEmployeeList,
                rideSelected: state.rideSelected,
                reloadRides: false,
                rideAlert: state.rideAlert,
            }
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};