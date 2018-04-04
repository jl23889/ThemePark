import { Action, Reducer } from 'redux';
import { RideTypeActions } from '../actions/_RideTypeActions'
import { RideType } from '../models/_DataModels'

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface RideTypeState {
    reloadData: boolean;
    rideTypeList: RideType[];
}

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: RideTypeState = { 
    rideTypeList: [], 
    reloadData: true 
};

type KnownAction = RideTypeActions // list of known actions

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