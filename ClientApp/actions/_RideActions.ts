import { ActionCreator } from 'redux';
import { AppThunkAction } from '../store/';
import { Ride } from '../models/_DataModels';
import { authHeader } from '../helpers/_authHeader'
import axios from 'axios';

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

export interface FetchRidesActionInProgress {
    type: 'FETCH_RIDES_IN_PROGRESS';
}

export interface FetchRidesActionSuccess {
    type: 'FETCH_RIDES_SUCCESS';
    rideList: Ride[];
}

export interface FetchRideActionSuccess {
    type: 'FETCH_RIDE_SUCCESS';
    ride: Ride;
}

export interface CreateRideAction {
    type: 'CREATE_RIDE';
}

export interface UpdateRideAction {
    type: 'UPDATE_RIDE';
}

export interface UpdateRideActionFail {
    type: 'UPDATE_RIDE_FAIL';
    rideSelected: Ride;
}

export interface DeleteRideAction {
    type: 'DELETE_RIDE';
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).

export type RideActions = FetchRidesActionInProgress | 
    FetchRidesActionSuccess | FetchRideActionSuccess |
    CreateRideAction | UpdateRideAction | UpdateRideActionFail | DeleteRideAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {

    // rides 
    requestRidesList: (): AppThunkAction<RideActions> => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        if (getState().rides.reloadRides) {
            dispatch({ type: 'FETCH_RIDES_IN_PROGRESS' });
            axios.get(`api/Ride/GetRides`)
            .then(response => {
                dispatch({ type: 'FETCH_RIDES_SUCCESS', rideList: response.data });
            })
            .catch(error => {
                // error dispatch goes here
            })
        }
    },
    // get a single ride by id
    requestRide: (id): AppThunkAction<RideActions> => (dispatch, getState) => {
        axios.get(`api/Employee/GetRide`, id)
        .then(response => {
            dispatch({ type: 'FETCH_RIDE_SUCCESS', ride: response.data });
        })
        .catch(error => {
            // error dispatch goes here
        })
    },
    createNewRide: (values): AppThunkAction<RideActions> => (dispatch, getState) => {
        axios({
            method: 'post',
            url: `api/Ride/CreateNewRide`,
            data: values,
            headers: authHeader(),
        })
        .then(response => {
            dispatch({ type: 'CREATE_RIDE' });
        })
        .catch(error => {
            // error dispatch goes here
        })
    },
    updateRide: (values): AppThunkAction<RideActions> => (dispatch, getState) => {
        axios({
            method: 'put',
            url: `api/Ride/UpdateRide`,
            data: values,
            headers: authHeader(),
        })
        .then(response => {
            dispatch({ type: 'UPDATE_RIDE' });
        })
        .catch(error => {
            dispatch({ type: 'UPDATE_RIDE_FAIL', rideSelected: values })
        })
    },
    deleteRide: (values): AppThunkAction<RideActions> => (dispatch, getState) => {
        // id is the rideId
        axios({
            method: 'post',
            url: `api/Ride/DeleteRide`,
            data: values,
            headers: authHeader(),
        })
        .then(
            response => {
                dispatch({ type: 'DELETE_RIDE' });
            }
        );
    },
};

// Individual actions (these are used by functional components) 
// get a single employee by id
export function requestRide(id) {
    return axios.get(`api/Ride/GetRide`, 
        { params: {
            id: id 
        }})
}