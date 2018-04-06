import { ActionCreator } from 'redux';
import { AppThunkAction } from '../store/';
import { TicketType } from '../models/_DataModels'
import axios from 'axios';

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

export interface FetchTicketTypeAction {
    type: 'FETCH_TICKET_TYPE';
    ticketTypeList: TicketType[];
}

export interface CreateTicketTypeAction {
    type: 'CREATE_TICKET_TYPE';
}

export interface UpdateTicketTypeAction {
    type: 'UPDATE_TICKET_TYPE';
}

export interface DeleteTicketTypeAction {
    type: 'DELETE_TICKET_TYPE';
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
export type TicketTypeActions = FetchTicketTypeAction | CreateTicketTypeAction 
	| UpdateTicketTypeAction | DeleteTicketTypeAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    requestTicketTypeList: (): AppThunkAction<TicketTypeActions> => (dispatch, getState) => {
        // Only load data if reload flag is true
        if (getState().ticketType.reloadData) {
            axios.get(`api/TicketType/LookUpTicketType`)
            .then(response => {
                dispatch({ type: 'FETCH_TICKET_TYPE', ticketTypeList: response.data });
            })
        }
    },
    createNewTicketType: (values): AppThunkAction<TicketTypeActions> => (dispatch, getState) => {
        axios.post(`api/TicketType/CreateNewTicketType`, values)
        .then(
            response => {
                dispatch({ type: 'CREATE_TICKET_TYPE' });
            }
        );
    },
    updateTicketType: (values): AppThunkAction<TicketTypeActions> => (dispatch, getState) => {
        axios.put(`api/TicketType/UpdateTicketType`, values)
        .then(
            response => {
                dispatch({ type: 'UPDATE_TICKET_TYPE' });
            }
        );
    },
    deleteTicketType: (values): AppThunkAction<TicketTypeActions> => (dispatch, getState) => {
        // id is the ticketTypeId
        axios.post(`api/TicketType/DeleteTicketType`, values)
        .then(
            response => {
                dispatch({ type: 'DELETE_TICKET_TYPE' });
            }
        );
    }
};