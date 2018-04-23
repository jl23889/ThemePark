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

export interface CreateRideActionSuccess {
    type: 'CREATE_RIDE_SUCCESS';
    toastId: number;
}

export interface CreateRideActionFail {
    type: 'CREATE_RIDE_FAIL';
    toastId: number;
}

export interface UpdateRideActionSuccess {
    type: 'UPDATE_RIDE_SUCCESS';
    toastId: number;
}

export interface UpdateRideActionFail {
    type: 'UPDATE_RIDE_FAIL';
    rideSelected: Ride;
    toastId: number;
}

export interface DeleteRideActionSuccess {
    type: 'DELETE_RIDE_SUCCESS';
    toastId: number;
}

export interface DeleteRideActionFail {
    type: 'DELETE_RIDE_FAIL';
    rideSelected: Ride;
    toastId: number;
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).

export type RideActions = FetchRidesActionInProgress | 
    FetchRidesActionSuccess | FetchRideActionSuccess |
    CreateRideActionSuccess | CreateRideActionFail | UpdateRideActionSuccess | UpdateRideActionFail |
    UpdateRideActionFail | DeleteRideActionSuccess | DeleteRideActionFail;

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

    createNewRide: (values,toastId): AppThunkAction<RideActions> => (dispatch, getState) => {
        // set default rideStatus to open
        values.status = 1;

        axios({
            method: 'post',
            url: `api/Ride/CreateNewRide`,
            data: values,
            headers: authHeader(),
        })
        .then(response => {
            dispatch({ type: 'CREATE_RIDE_SUCCESS', toastId: toastId });
        })
        .catch(error => {
            dispatch({ type: 'CREATE_RIDE_FAIL', toastId: toastId });
        })
    },
    updateRide: (values, toastId): AppThunkAction<RideActions> => (dispatch, getState) => {
        axios({
            method: 'put',
            url: `api/Ride/UpdateRide`,
            data: values,
            headers: authHeader(),
        })
        .then(response => {
            dispatch({ type: 'UPDATE_RIDE_SUCCESS', toastId: toastId });
        })
        .catch(error => {
            dispatch({ type: 'UPDATE_RIDE_FAIL', rideSelected: values , toastId: toastId })
        })
    },

    deleteRide: (values,toastId): AppThunkAction<RideActions> => (dispatch, getState) => {
        // id is the rideId
        axios({
            method: 'post',
            url: `api/Ride/DeleteRide`,
            data: values,
            headers: authHeader(),
        })
        .then(response => {
                dispatch({ type: 'DELETE_RIDE_SUCCESS', toastId: toastId });
        })
            .catch(error => {
                dispatch({ type: 'DELETE_RIDE_FAIL', rideSelected: values , toastId: toastId });
        })
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

// get multiple employees by array of ids
export function requestRidesById(ids) {
    var params = new URLSearchParams();
    ids.forEach(element => {
        params.append('id', element)
    })

    return axios.get(`api/Ride/GetRidesById`, 
        { params: params })
}

// get all rides
export function requestRides() {
    return axios.get(`api/Ride/GetRides`)
}

// assign employee to ride
export function assignRideEmployees(values, toastId) {
    return axios({
        method: 'post',
        url: `api/Ride/AssignRideEmployees`,
        data: values,
        headers: authHeader(),
    })
}

// assign employee to ride
export function assignRideManagers(values, toastId) {
    return axios({
        method: 'post',
        url: `api/Ride/AssignRideManagers`,
        data: values,
        headers: authHeader(),
    })
}

// remove all employees from ride
export function removeAllRideEmployees(values) {
    return axios({
        method: 'post',
        url: `api/Ride/RemoveAllRideEmployees`,
        data: values,
        headers: authHeader(),
    })
}

// remove all managers from ride
export function removeAllRideManagers(values) {
    return axios({
        method: 'post',
        url: `api/Ride/RemoveAllRideManagers`,
        data: values,
        headers: authHeader(),
    })
}

// get info about ride by ride id and date range
// values should be {rideId, startDate, endDate}
export function requestDetailedVisitRide(values) {
    return axios.get(`api/Report/DetailedVisitRide`, 
        { params: values })
}

// get info about ride by ride id and date range
// values should be {startDate, endDate}
export function requestSummaryVisit(values) {
    return axios.get(`api/Report/SummaryVisit`, 
        { params: values })
}

// get info about ticket by date range
// values should be {startDate, endDate}
export function requestTicketSales(values) {
    return axios.get(`api/Report/TicketSales`, 
        { params: values })
}


// get info about by ride id and date range
// values should be {rideId, startDate, endDate}
// export function requestDetailedVisitRide(values) {
//     return axios({
//         method: 'get',
//         url: `api/Report/DetailedVisitRide`,
//         data: values,
//         headers: authHeader(),
//     })
// }



