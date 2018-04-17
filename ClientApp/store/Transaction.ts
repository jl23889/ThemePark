import { Action, Reducer } from 'redux';
import { TransactionActions } from '../actions/_TransactionActions'
import { Alert, Ticket, TicketType, Transaction } from '../models/_DataModels'

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface TransactionState {
    ticketList: Ticket[];
    ticketTypeList: TicketType[];
    transactionTotal: number;
    effectiveDate: Date;
    ticketTransactionList: Transaction[];
    alert: Alert;
}

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: TransactionState = { 
    ticketList: [],
    ticketTypeList: [],
    transactionTotal: 0,
    effectiveDate: new Date(),
    ticketTransactionList: [],
    alert: null,
};

type KnownAction = TransactionActions // list of known actions

export const reducer: Reducer<TransactionState> = (state: TransactionState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'SET_DATE': 
            return {
                ticketList: state.ticketList,
                ticketTypeList: state.ticketTypeList,
                transactionTotal: state.transactionTotal,
                effectiveDate: action.effectiveDate,
                ticketTransactionList: state.ticketTransactionList,
                alert: state.alert,
            }
        case 'FETCH_TICKET_TYPES': 
            return {
                ticketList: state.ticketList,
                ticketTypeList: action.ticketTypes,
                transactionTotal: state.transactionTotal,
                effectiveDate: state.effectiveDate,
                ticketTransactionList: state.ticketTransactionList,
                alert: state.alert,
            }
        case 'FETCH_CUSTOMER_TRANS':
            return {
                ticketList: state.ticketList,
                ticketTypeList: state.ticketTypeList,
                transactionTotal: state.transactionTotal,
                effectiveDate: state.effectiveDate,
                ticketTransactionList: action.transactionList,
                alert: state.alert,
            }
        case 'UPDATE_TRANSACTION_TOTAL': 
            return {
                ticketList: action.ticketList,
                ticketTypeList: state.ticketTypeList,
                transactionTotal: action.transactionTotal,
                effectiveDate: state.effectiveDate,
                ticketTransactionList: state.ticketTransactionList,
                alert: state.alert,
            }
        case 'TICKET_TRANSACTION_IN_PROGRESS': 
            return {
                ticketList: state.ticketList,
                ticketTypeList: state.ticketTypeList,
                transactionTotal: state.transactionTotal,
                effectiveDate: state.effectiveDate,
                ticketTransactionList: state.ticketTransactionList,
                alert: state.alert, 
            }
        case 'TICKET_TRANSACTION_SUCCESS': 
            return {
                ticketList: state.ticketList,
                ticketTypeList: state.ticketTypeList,
                transactionTotal: state.transactionTotal,
                effectiveDate: state.effectiveDate,
                ticketTransactionList: state.ticketTransactionList,
                alert: {
                    'toastId': action.toastId,
                    'alertType': 'success',
                    'alertMessage': 'Transaction Successful!'
                },
            }
        case 'TICKET_TRANSACTION_FAIL': 
            return {
                ticketList: state.ticketList,
                ticketTypeList: state.ticketTypeList,
                transactionTotal: state.transactionTotal,
                effectiveDate: state.effectiveDate,
                ticketTransactionList: state.ticketTransactionList,
                alert: {
                    'toastId': action.toastId,
                    'alertType': 'error',
                    'alertMessage': 'There was an error with your transaction! Please try again.'
                },
            }
        case 'TICKET_TRANSACTION_CREATED': 
            return {
                ticketList: state.ticketList,
                ticketTypeList: state.ticketTypeList,
                transactionTotal: state.transactionTotal,
                effectiveDate: state.effectiveDate,
                ticketTransactionList: state.ticketTransactionList,
                alert: {
                    'toastId': action.toastId,
                    'alertType': 'warning',
                    'alertMessage': 'Creating record of ticket transaction...'
                },
            }
        case 'TICKET_CREATED': 
            return {
                ticketList: state.ticketList,
                ticketTypeList: state.ticketTypeList,
                transactionTotal: state.transactionTotal,
                effectiveDate: state.effectiveDate,
                ticketTransactionList: state.ticketTransactionList,
                alert: {
                    'toastId': action.toastId,
                    'alertType': 'warning',
                    'alertMessage': 'Creating ticketId ' + action.ticketId + '...'
                },
            }
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};