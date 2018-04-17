import { ActionCreator } from 'redux';
import { AppThunkAction } from '../store/';
import { Alert, Customer, Ticket, Ride } from '../models/_DataModels'
import { authHeader } from '../helpers/_authHeader'
import axios from 'axios';

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

export interface FetchRidesAction {
    type: 'FETCH_RIDES';
    rideList: Ride[];
}

export interface FetchTicketAction {
    type: 'FETCH_TICKET';
    ticket: Ticket;
}

export interface ScanTicketActionSuccess {
    type: 'SCAN_TICKET_SUCCESS';
    toastId: number;
}

export interface ScanTicketActionFail {
    type: 'SCAN_TICKET_FAIL';
    toastId: number;
}


// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
export type TicketActions = FetchRidesAction | FetchTicketAction |
    ScanTicketActionSuccess | ScanTicketActionFail ;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    requestRideList: (): AppThunkAction<TicketActions> => (dispatch, getState) => {
        axios.get(`api/Ride/GetRides`)
        .then(response => {
            dispatch({ type: 'FETCH_RIDES', rideList: response.data });
        })
    },

    requestTicket: (ticket): AppThunkAction<TicketActions> => (dispatch, getState) => {
        axios.get(`api/Ticket/GetTicket`)
        .then(response => {
            dispatch({ type: 'FETCH_TICKET', ticket: response.data });
        })
    },
    // returns ticket if it is a valid ticket (effectiveDate < now < expirationDate)
    requestValidTicket: (ticket): AppThunkAction<TicketActions> => (dispatch, getState) => {
        axios.get(`api/Ticket/GetTicket`)
        .then(response => {
            dispatch({ type: 'FETCH_TICKET', ticket: response.data });
        })
    },

    scanTicket: (values, toastId): AppThunkAction<TicketActions> => (dispatch, getState) => {
        axios({
            method: 'post',
            url: `api/Ticket/CreateNewTicketRideEnters`,
            data: values,
            headers: authHeader(),
        })
        .then(response => {
            dispatch({ type: 'SCAN_TICKET_SUCCESS', toastId: toastId });
        })
        .catch(error => {
            dispatch({ type: 'SCAN_TICKET_FAIL', toastId: toastId })
        });
    },
};