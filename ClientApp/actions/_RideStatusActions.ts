import { ActionCreator } from 'redux';
import { AppThunkAction } from '../store/';
import { RideStatus } from '../models/_DataModels'
import axios from 'axios';

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

export interface FetchRideStatusAction {
    type: 'FETCH_RIDE_STATUS';
    rideStatusList: RideStatus[];
}

export interface CreateRideStatusAction {
    type: 'CREATE_RIDE_STATUS';
}

export interface UpdateRideStatusAction {
    type: 'UPDATE_RIDE_STATUS';
}

export interface DeleteRideStatusAction {
    type: 'DELETE_RIDE_STATUS';
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
export type RideStatusActions =  FetchRideStatusAction | CreateRideStatusAction
    | UpdateRideStatusAction | DeleteRideStatusAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    requestRideStatusList: (): AppThunkAction<RideStatusActions> => (dispatch, getState) => {
        // Only load data if reload flag is true
        if (getState().rideStatus.reloadData) {
            axios.get(`api/RideStatus/LookUpRideStatus`)
            .then(response => {
                dispatch({ type: 'FETCH_RIDE_STATUS', rideStatusList: response.data });
            })
        }
    },
    createNewRideStatus: (values): AppThunkAction<RideStatusActions> => (dispatch, getState) => {
        axios.post(`api/RideStatus/CreateNewRideStatus`, values)
        .then(
            response => {
                dispatch({ type: 'CREATE_RIDE_STATUS' });
            }
        );
    },
    updateRideStatus: (values): AppThunkAction<RideStatusActions> => (dispatch, getState) => {
        axios.put(`api/RideStatus/UpdateRideStatus`, values)
        .then(
            response => {
                dispatch({ type: 'UPDATE_RIDE_STATUS' });
            }
        );
    },
    deleteRideStatus: (values): AppThunkAction<RideStatusActions> => (dispatch, getState) => {
        // id is the rideStatusId
        axios.post(`api/RideStatus/DeleteRideStatus`, values)
        .then(
            response => {
                dispatch({ type: 'DELETE_RIDE_STATUS' });
            }
        );
    }
};