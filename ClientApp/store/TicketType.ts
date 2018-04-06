import { Action, Reducer } from 'redux';
import { TicketTypeActions } from '../actions/_TicketTypeActions'
import { TicketType } from '../models/_DataModels'

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface TicketTypeState {
    reloadData: boolean;
    ticketTypeList: TicketType[];
}

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: TicketTypeState = { 
    ticketTypeList: [], 
    reloadData: true 
};

type KnownAction = TicketTypeActions // list of known actions

export const reducer: Reducer<TicketTypeState> = (state: TicketTypeState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'FETCH_TICKET_TYPE':
            return {
                ticketTypeList: action.ticketTypeList,
                reloadData: false
            }
        case 'CREATE_TICKET_TYPE':
            return {
                ticketTypeList: state.ticketTypeList,
                reloadData: true
            }
        case 'UPDATE_TICKET_TYPE':
            return {
                ticketTypeList: state.ticketTypeList,
                reloadData: true
            }
        case 'DELETE_TICKET_TYPE':
            return {
                ticketTypeList: state.ticketTypeList,
                reloadData: true
            }
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};