import { fetch, addTask } from 'domain-task';
import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from './';
import axios from 'axios';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface RidesState {
    isLoading: boolean;
    ridesList: Ride[];
}

export interface Ride {
    rideId: string;
    rideName: string;
    totalCapcity: number;
    installationDate: string;
    status: number;
    fastPassPossible: number;
    rideType: number;
    lastMaintenanceSince: string;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface RequestRidesAction {
    type: 'REQUEST_RIDES';
}

interface FetchRidesAction {
    type: 'FETCH_RIDES';
    ridesList: Ride[];
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = RequestRidesAction | FetchRidesAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    requestRidesList: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        if (!getState().rideStatus.isLoading) {
            axios.get(`api/SampleData/GetRides`)
            .then(response => {
                dispatch({ type: 'FETCH_RIDES', ridesList: response.data });
            })
        }
    }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: RidesState = { 
    ridesList: [], 
    isLoading: false 
};

export const reducer: Reducer<RidesState> = (state: RidesState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_RIDES':
            return {
                ridesList: state.ridesList,
                isLoading: true
            }
        case 'FETCH_RIDES':
            return {
                ridesList: action.ridesList,
                isLoading: false
            }
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};