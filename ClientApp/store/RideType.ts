import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from './';
import axios from 'axios';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface RideTypeState {
    reloadData: boolean;
    rideTypeList: RideType[];
}

export interface RideType {
    rideTypeId: number;
    rideType: string;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface FetchRideTypeAction {
    type: 'FETCH_RIDE_TYPE';
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
type KnownAction = FetchRideTypeAction | CreateRideTypeAction | UpdateRideTypeAction | DeleteRideTypeAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    requestRideTypeList: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        // Only load data if reload flag is true
        if (getState().rideType.reloadData) {
            axios.get(`api/RideType/LookUpRideType`)
            .then(response => {
                dispatch({ type: 'FETCH_RIDE_TYPE', rideTypeList: response.data });
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

const unloadedState: RideTypeState = { 
    rideTypeList: [], 
    reloadData: true 
};

export const reducer: Reducer<RideTypeState> = (state: RideTypeState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'FETCH_RIDE_TYPE':
            return {
                rideTypeList: action.rideTypeList,
                reloadData: false
            }
        case 'CREATE_RIDE_TYPE':
            return {
                rideTypeList: state.rideTypeList,
                reloadData: true
            }
        case 'UPDATE_RIDE_TYPE':
            return {
                rideTypeList: state.rideTypeList,
                reloadData: true
            }
        case 'DELETE_RIDE_TYPE':
            return {
                rideTypeList: state.rideTypeList,
                reloadData: true
            }
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};