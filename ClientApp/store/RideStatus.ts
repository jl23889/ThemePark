import { fetch, addTask } from 'domain-task';
import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from './';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface RideStatusState {
    isLoading: boolean;
    rideStatusList: RideStatus[];
}

export interface RideStatus {
    rideStatusId: number;
    rideStatus: string;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface RequestRideStatusAction {
    type: 'REQUEST_RIDE_STATUS';
}

interface ReceiveRideStatusAction {
    type: 'RECEIVE_RIDE_STATUS';
    rideStatusList: RideStatus[];
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = RequestRideStatusAction | ReceiveRideStatusAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    requestRideStatusList: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        if (!getState().rideStatus.isLoading) {
            let fetchTask = fetch(`api/SampleData/LookUpRideStatus`)
                .then(response => response.json() as Promise<RideStatus[]>)
                .then(data => {
                    dispatch({ type: 'RECEIVE_RIDE_STATUS', rideStatusList: data });
                });

            addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
            dispatch({ type: 'REQUEST_RIDE_STATUS' });
        }
    }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: RideStatusState = { rideStatusList: [], isLoading: false };

export const reducer: Reducer<RideStatusState> = (state: RideStatusState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_RIDE_STATUS':
            return {
                rideStatusList: state.rideStatusList,
                isLoading: true
            };
        case 'RECEIVE_RIDE_STATUS':
            return {
                rideStatusList: action.rideStatusList,
                isLoading: false
            }
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};