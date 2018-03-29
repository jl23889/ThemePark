import { fetch, addTask } from 'domain-task';
import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from './';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface RideTypeState {
    isLoading: boolean;
    rideTypeList: RideType[];
}

export interface RideType {
    rideTypeId: number;
    rideType: string;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface RequestRideTypeAction {
    type: 'REQUEST_RIDE_TYPE';
}

interface ReceiveRideTypeAction {
    type: 'RECEIVE_RIDE_TYPE';
    rideTypeList: RideType[];
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = RequestRideTypeAction | ReceiveRideTypeAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    requestRideTypeList: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        if (!getState().rideType.isLoading) {
            let fetchTask = fetch(`api/SampleData/LookUpRideType`)
                .then(response => response.json() as Promise<RideType[]>)
                .then(data => {
                    dispatch({ type: 'RECEIVE_RIDE_TYPE', rideTypeList: data });
                });

            addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
            dispatch({ type: 'REQUEST_RIDE_TYPE' });
        }
    },
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: RideTypeState = { rideTypeList: [], isLoading: false };

export const reducer: Reducer<RideTypeState> = (state: RideTypeState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_RIDE_TYPE':
            return {
                rideTypeList: state.rideTypeList,
                isLoading: true
            };
        case 'RECEIVE_RIDE_TYPE':
            return {
                rideTypeList: action.rideTypeList,
                isLoading: false
            }
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};