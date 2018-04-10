import { ActionCreator } from 'redux';
import { AppThunkAction } from '../store/';
import { RideStatus, RideType } from '../models/_DataModels'
import { authHeader } from '../helpers/_authHeader'
import axios from 'axios';

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

export interface FetchRideTypeAction {
    type: 'FETCH_RIDE_TYPE';
    rideTypeList: RideType[];
}

export interface CreateRideTypeAction {
    type: 'CREATE_RIDE_TYPE';
}

export interface UpdateRideTypeAction {
    type: 'UPDATE_RIDE_TYPE';
}

export interface DeleteRideTypeAction {
    type: 'DELETE_RIDE_TYPE';
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
export type RideTypeActions = FetchRideTypeAction | CreateRideTypeAction 
	| UpdateRideTypeAction | DeleteRideTypeAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    requestRideTypeList: (): AppThunkAction<RideTypeActions> => (dispatch, getState) => {
        // Only load data if reload flag is true
        if (getState().rideType.reloadData) {
            axios.get(`api/RideType/LookUpRideType`)
            .then(response => {
                dispatch({ type: 'FETCH_RIDE_TYPE', rideTypeList: response.data });
            })
        }
    },
    createNewRideType: (values): AppThunkAction<RideTypeActions> => (dispatch, getState) => {
        axios({
            method: 'post',
            url: `api/RideType/CreateNewRideType`,
            data: values,
            headers: authHeader(),
        })
        .then(
            response => {
                dispatch({ type: 'CREATE_RIDE_TYPE' });
            }
        );
    },
    updateRideType: (values): AppThunkAction<RideTypeActions> => (dispatch, getState) => {
        axios({
            method: 'put',
            url: `api/RideType/UpdateRideType`,
            data: values,
            headers: authHeader(),
        })
        .then(
            response => {
                dispatch({ type: 'UPDATE_RIDE_TYPE' });
            }
        );
    },
    deleteRideType: (values): AppThunkAction<RideTypeActions> => (dispatch, getState) => {
        // id is the rideTypeId
        axios({
            method: 'post',
            url: `api/RideType/DeleteRideType`,
            data: values,
            headers: authHeader(),
        })
        .then(
            response => {
                dispatch({ type: 'DELETE_RIDE_TYPE' });
            }
        );
    }
};