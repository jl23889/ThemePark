import { Action, Reducer } from 'redux';
import { TicketActions } from '../actions/_TicketActions'
import { Alert, Ride, Ticket } from '../models/_DataModels'

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface TicketState {
    alert: Alert;
    ticket: Ticket;
    rideList: Ride[];
}

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: TicketState = { 
    alert: null ,
    ticket: null,
    rideList: [],
};

type KnownAction = TicketActions // list of known actions

export const reducer: Reducer<TicketState> = (state: TicketState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'FETCH_RIDES':
            return {
                ticket: state.ticket,
                alert: state.alert,
                rideList: action.rideList
            }
        case 'FETCH_TICKET':
            return {
                ticket: action.ticket,
                alert: state.alert,
                rideList: state.rideList
            }
        case 'SCAN_TICKET_SUCCESS':
            return {
                ticket: state.ticket,
                alert: {
                    'toastId': action.toastId,
                    'alertType': 'success',
                    'alertMessage': 'Scanned Ticket Successfully!'
                },
                rideList: state.rideList
            }
        case 'SCAN_TICKET_FAIL':
            return {
                ticket: state.ticket,
                alert: {
                    'toastId': action.toastId,
                    'alertType': 'error',
                    'alertMessage': 'Invalid Ticket!'
                },
                rideList: state.rideList
            }
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};