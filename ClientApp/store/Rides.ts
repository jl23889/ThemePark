import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from './';
import axios from 'axios';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface RidesState {
    rideList: Ride[];
    rideStatusList: RideStatus[];
    rideTypeList: RideType[];
    reloadRides: boolean;
    reloadRideStatuses: boolean;
    reloadRideTypes: boolean;
}

export interface Ride {
    rideId: string;
    rideName: string;
    totalCapcity: number;
    installationDate(): Date;
    status: number;
    fastPassPossible: boolean;
    rideType: number;
    lastMaintenanceSince(): Date;
}

export interface RideStatus {
    rideStatusId: number;
    rideStatus: string;
}

export interface RideType {
    rideTypeId: number;
    rideType: string;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

// rides
interface FetchRidesAction {
    type: 'FETCH_RIDES';
    rideList: Ride[];
}

interface CreateRideAction {
    type: 'CREATE_RIDE';
}

interface UpdateRideAction {
    type: 'UPDATE_RIDE';
}

interface DeleteRideAction {
    type: 'DELETE_RIDE';
}

// ride statuses
interface FetchRideStatusesAction {
    type: 'FETCH_RIDE_STATUSES';
    rideStatusList: RideStatus[];
}

interface CreateRideStatusAction {
    type: 'CREATE_RIDE_STATUS';
}

interface UpdateRideStatusAction {
    type: 'UPDATE_RIDE_STATUS';
}

interface DeleteRideStatusAction {
    type: 'DELETE_RIDE_STATUS';
}

// ride types
interface FetchRideTypesAction {
    type: 'FETCH_RIDE_TYPES';
    rideTypeList: RideType[];
}

interface CreateRideTypeAction {
    type: 'CREATE_RIDE_TYPE';
}

interface UpdateRideTypeAction {
    type: 'UPDATE_RIDE_TYPE';
}

interface DeleteRideTypeAction {
    type: 'DELETE_RIDE_TYPE';
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction =  FetchRidesAction | CreateRideAction | UpdateRideAction | DeleteRideAction |
    FetchRideStatusesAction | CreateRideStatusAction | UpdateRideStatusAction | DeleteRideStatusAction |
    FetchRideTypesAction | CreateRideTypeAction | UpdateRideTypeAction | DeleteRideTypeAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {

    // rides 
    requestRidesList: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        if (getState().rides.reloadRides) {
            axios.get(`api/Ride/GetRides`)
            .then(response => {
                dispatch({ type: 'FETCH_RIDES', rideList: response.data });
            })
        }
    },
    createNewRide: (values): AppThunkAction<KnownAction> => (dispatch, getState) => {
        axios.post(`api/Ride/CreateNewRide`, values)
        .then(
            response => {
                dispatch({ type: 'CREATE_RIDE' });
            }
        );
    },
    updateRide: (values): AppThunkAction<KnownAction> => (dispatch, getState) => {
        axios.put(`api/Ride/UpdateRide`, values)
        .then(
            response => {
                dispatch({ type: 'UPDATE_RIDE' });
            }
        );
    },
    deleteRide: (values): AppThunkAction<KnownAction> => (dispatch, getState) => {
        // id is the rideId
        axios.post(`api/Ride/DeleteRide`, values)
        .then(
            response => {
                dispatch({ type: 'DELETE_RIDE' });
            }
        );
    },

    // ride statuses
    requestRideStatusList: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        // Only load data if reload flag is true
        if (getState().rides.reloadRideStatuses) {
            axios.get(`api/RideStatus/LookUpRideStatus`)
            .then(response => {
                dispatch({ type: 'FETCH_RIDE_STATUSES', rideStatusList: response.data });
            })
        }
    },
    createNewRideStatus: (values): AppThunkAction<KnownAction> => (dispatch, getState) => {
        axios.post(`api/RideStatus/CreateNewRideStatus`, values)
        .then(
            response => {
                dispatch({ type: 'CREATE_RIDE_STATUS' });
            }
        );
    },
    updateRideStatus: (values): AppThunkAction<KnownAction> => (dispatch, getState) => {
        axios.put(`api/RideStatus/UpdateRideStatus`, values)
        .then(
            response => {
                dispatch({ type: 'UPDATE_RIDE_STATUS' });
            }
        );
    },
    deleteRideStatus: (values): AppThunkAction<KnownAction> => (dispatch, getState) => {
        // id is the rideStatusId
        axios.post(`api/RideStatus/DeleteRideStatus`, values)
        .then(
            response => {
                dispatch({ type: 'DELETE_RIDE_STATUS' });
            }
        );
    },

    // ride types
    requestRideTypeList: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        // Only load data if reload flag is true
        if (getState().rides.reloadRideTypes) {
            axios.get(`api/RideType/LookUpRideType`)
            .then(response => {
                dispatch({ type: 'FETCH_RIDE_TYPES', rideTypeList: response.data });
            })
        }
    },
    createNewRideType: (values): AppThunkAction<KnownAction> => (dispatch, getState) => {
        axios.post(`api/RideType/CreateNewRideType`, values)
        .then(
            response => {
                dispatch({ type: 'CREATE_RIDE_TYPE' });
            }
        );
    },
    updateRideType: (values): AppThunkAction<KnownAction> => (dispatch, getState) => {
        axios.put(`api/RideType/UpdateRideType`, values)
        .then(
            response => {
                dispatch({ type: 'UPDATE_RIDE_TYPE' });
            }
        );
    },
    deleteRideType: (values): AppThunkAction<KnownAction> => (dispatch, getState) => {
        // id is the rideTypeId
        axios.post(`api/RideType/DeleteRideType`, values)
        .then(
            response => {
                dispatch({ type: 'DELETE_RIDE_TYPE' });
            }
        );
    }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: RidesState = { 
    rideList: [], 
    rideStatusList: [],
    rideTypeList: [],
    reloadRides: true,
    reloadRideStatuses: true,
    reloadRideTypes: true
};

export const reducer: Reducer<RidesState> = (state: RidesState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        // rides
        case 'FETCH_RIDES':
            return {
                rideList: action.rideList,
                rideStatusList: state.rideStatusList,
                rideTypeList: state.rideTypeList,
                reloadRides: false,
                reloadRideStatuses: false,
                reloadRideTypes: false
            }
        case 'CREATE_RIDE':
            return {
                rideList: state.rideList,
                rideStatusList: state.rideStatusList,
                rideTypeList: state.rideTypeList,
                reloadRides: true,
                reloadRideStatuses: false,
                reloadRideTypes: false
            }
        case 'UPDATE_RIDE':
            return {
                rideList: state.rideList,
                rideStatusList: state.rideStatusList,
                rideTypeList: state.rideTypeList,
                reloadRides: true,
                reloadRideStatuses: false,
                reloadRideTypes: false
            }
        case 'DELETE_RIDE':
            return {
                rideList: state.rideList,
                rideStatusList: state.rideStatusList,
                rideTypeList: state.rideTypeList,
                reloadRides: true,
                reloadRideStatuses: false,
                reloadRideTypes: false
            }    

        // ride status
        case 'FETCH_RIDE_STATUSES':
            return {
                rideList: state.rideList,
                rideStatusList: action.rideStatusList,
                rideTypeList: state.rideTypeList,
                reloadRides: false,
                reloadRideStatuses: false,
                reloadRideTypes: false
            }
        case 'CREATE_RIDE_STATUS':
            return {
                rideList: state.rideList,
                rideStatusList: state.rideStatusList,
                rideTypeList: state.rideTypeList,
                reloadRides: false,
                reloadRideStatuses: true,
                reloadRideTypes: false
            }
        case 'UPDATE_RIDE_STATUS':
            return {
                rideList: state.rideList,
                rideStatusList: state.rideStatusList,
                rideTypeList: state.rideTypeList,
                reloadRides: false,
                reloadRideStatuses: true,
                reloadRideTypes: false
            }
        case 'DELETE_RIDE_STATUS':
            return {
                rideList: state.rideList,
                rideStatusList: state.rideStatusList,
                rideTypeList: state.rideTypeList,
                reloadRides: false,
                reloadRideStatuses: true,
                reloadRideTypes: false
            }  

        // ride type
        case 'FETCH_RIDE_TYPES':
            return {
                rideList: state.rideList,
                rideStatusList: state.rideStatusList,
                rideTypeList: action.rideTypeList,
                reloadRides: false,
                reloadRideStatuses: false,
                reloadRideTypes: false
            }
        case 'CREATE_RIDE_TYPE':
            return {
                rideList: state.rideList,
                rideStatusList: state.rideStatusList,
                rideTypeList: state.rideTypeList,
                reloadRides: false,
                reloadRideStatuses: false,
                reloadRideTypes: true
            }
        case 'UPDATE_RIDE_TYPE':
            return {
                rideList: state.rideList,
                rideStatusList: state.rideStatusList,
                rideTypeList: state.rideTypeList,
                reloadRides: false,
                reloadRideStatuses: false,
                reloadRideTypes: true
            }
        case 'DELETE_RIDE_TYPE':
            return {
                rideList: state.rideList,
                rideStatusList: state.rideStatusList,
                rideTypeList: state.rideTypeList,
                reloadRides: false,
                reloadRideStatuses: false,
                reloadRideTypes: true
            }  
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};