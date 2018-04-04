import { Action, Reducer } from 'redux';
import { FetchRideStatusAction } from '../actions/_RideStatusActions'
import { FetchRideTypeAction } from '../actions/_RideTypeActions'
import { RideActions } from '../actions/_RideActions'

import { Ride, RideStatus, RideType } from '../models/_DataModels'

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface RidesState {
    rideList: Ride[];
    rideStatusList: RideStatus[];
    rideTypeList: RideType[];
    rideSelected: Ride;
    reloadRides: boolean;
}

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: RidesState = { 
    rideList: [], 
    rideStatusList: [],
    rideTypeList: [],
    rideSelected: null,
    reloadRides: true,
};

type KnownAction = RideActions | FetchRideStatusAction | FetchRideTypeAction;

export const reducer: Reducer<RidesState> = (state: RidesState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        // rides
        case 'FETCH_RIDES':
            return {
                rideList: action.rideList,
                rideStatusList: state.rideStatusList,
                rideTypeList: state.rideTypeList,
                rideSelected: state.rideSelected,
                reloadRides: false
            }
        case 'CREATE_RIDE':
            return {
                rideList: state.rideList,
                rideStatusList: state.rideStatusList,
                rideTypeList: state.rideTypeList,
                rideSelected: state.rideSelected,
                reloadRides: true
            }
        case 'UPDATE_RIDE':
            return {
                rideList: state.rideList,
                rideStatusList: state.rideStatusList,
                rideTypeList: state.rideTypeList,
                rideSelected: state.rideSelected,
                reloadRides: true
            }
        case 'UPDATE_RIDE_FAIL':
            return {
                rideList: state.rideList,
                rideStatusList: state.rideStatusList,
                rideTypeList: state.rideTypeList,
                rideSelected: action.rideSelected,
                reloadRides: false
            }
        case 'DELETE_RIDE':
            return {
                rideList: state.rideList,
                rideStatusList: state.rideStatusList,
                rideTypeList: state.rideTypeList,
                rideSelected: state.rideSelected,
                reloadRides: true
            }    

        // ride status
        case 'FETCH_RIDE_STATUS':
            return {
                rideList: state.rideList,
                rideStatusList: action.rideStatusList,
                rideTypeList: state.rideTypeList,
                rideSelected: state.rideSelected,
                reloadRides: false
            }

        // ride type
        case 'FETCH_RIDE_TYPE':
            return {
                rideList: state.rideList,
                rideStatusList: state.rideStatusList,
                rideTypeList: action.rideTypeList,
                rideSelected: state.rideSelected,
                reloadRides: false
            }
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};