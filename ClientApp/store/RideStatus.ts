import { Action, Reducer } from 'redux';
import { RideStatusActions } from '../actions/_RideStatusActions'
import { RideStatus } from '../models/_DataModels'

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface RideStatusState {
    reloadData: boolean;
    rideStatusList: RideStatus[];  // list that should be rendered in table
}

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: RideStatusState = { 
    rideStatusList: [], 
    reloadData: true 
};

type KnownAction = RideStatusActions // list of known actions

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
        case 'DELETE_RIDE_STATUS':
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