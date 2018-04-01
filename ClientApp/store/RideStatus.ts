import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from './';
import axios from 'axios';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface RideStatusState {
    reloadData: boolean;
    rideStatusList: RideStatus[];  // list that should be rendered in table
}

export interface RideStatus {
    rideStatusId: number;
    rideStatus: string;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface FetchRideStatusAction {
    type: 'FETCH_RIDE_STATUS';
    rideStatusList: RideStatus[];
}

interface CreateRideStatusAction {
    type: 'CREATE_RIDE_STATUS';
}

interface UpdateRideStatusAction {
    type: 'UPDATE_RIDE_STATUS';
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction =  FetchRideStatusAction | CreateRideStatusAction
    | UpdateRideStatusAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    requestRideStatusList: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        // Only load data if reload flag is true
        if (getState().rideStatus.reloadData) {
            axios.get(`api/SampleData/LookUpRideStatus`)
            .then(response => {
                dispatch({ type: 'FETCH_RIDE_STATUS', rideStatusList: response.data });
            })
        }
    },
    createNewRideStatus: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        axios.post(`api/SampleData/CreateNewRideStatus`, getState().form.rideStatus.values)
        .then(
            response => {
                console.log(response);
                dispatch({ type: 'CREATE_RIDE_STATUS' });
            }
        );
    },
    updateRideStatus: (values): AppThunkAction<KnownAction> => (dispatch, getState) => {
        console.log(getState());
        console.log(values);
        axios.put(`api/SampleData/UpdateRideStatus`, values)
        .then(
            response => {
                console.log(response);
                dispatch({ type: 'UPDATE_RIDE_STATUS' });
            }
        );
    }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: RideStatusState = { 
    rideStatusList: [], 
    reloadData: true 
};

export const reducer: Reducer<RideStatusState> = (state: RideStatusState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'FETCH_RIDE_STATUS':
            return {
                rideStatusList: action.rideStatusList,
                reloadData: false
            }
        case 'CREATE_RIDE_STATUS':
            return {
                rideStatusList: state.rideStatusList,
                reloadData: true
            }
        case 'UPDATE_RIDE_STATUS':
            return {
                rideStatusList: state.rideStatusList,
                reloadData: true
            }
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};