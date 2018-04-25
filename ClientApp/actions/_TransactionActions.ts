import { ActionCreator } from 'redux';
import { AppThunkAction } from '../store/';
import { authHeader } from '../helpers/_authHeader'
import { Ticket, TicketType, Transaction } from '../models/_DataModels'

import axios from 'axios';

// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

export interface SetDateAction {
    type: 'SET_DATE';
    effectiveDate: Date;
}

export interface FetchTicketTypesAction {
    type: 'FETCH_TICKET_TYPES';
    ticketTypes: TicketType[];
}

export interface FetchCustomerTransAction {
    type: 'FETCH_CUSTOMER_TRANS';
    transactionList: Transaction[];
}

export interface CalculateTransactionTotalAction {
    type: 'UPDATE_TRANSACTION_TOTAL';
    ticketList: Ticket[];
    transactionTotal: number;
}

export interface TicketTransactionActionInProgress {
    type: 'TICKET_TRANSACTION_IN_PROGRESS';
}

export interface TicketTransactionCreatedAction {
    type: 'TICKET_TRANSACTION_CREATED';
    toastId: number;
}

export interface TicketCreatedAction {
    type: 'TICKET_CREATED';
    ticketId: string;
    toastId: number;
}

export interface TicketTransactionActionSuccess {
    type: 'TICKET_TRANSACTION_SUCCESS';
    toastId: number;
}

export interface TicketTransactionActionFail {
    type: 'TICKET_TRANSACTION_FAIL';
    toastId: number;
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
export type TransactionActions = SetDateAction | FetchCustomerTransAction |
    FetchTicketTypesAction | CalculateTransactionTotalAction |
    TicketTransactionActionInProgress | TicketTransactionCreatedAction | TicketCreatedAction |
    TicketTransactionActionSuccess | TicketTransactionActionFail;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    // get list of ticket types
    requestTicketTypes: (): AppThunkAction<TransactionActions> => (dispatch, getState) => {
        axios.get('api/TicketType/LookUpTicketType')
        .then(response => {
            dispatch({ type: 'FETCH_TICKET_TYPES', ticketTypes: response.data });
        })
    },
    // returns all of customer's ticket trnasactions
    requestCustomerTicketTransactions: (customerId): AppThunkAction<TransactionActions> => (dispatch, getState) => {
        axios({
            method: 'get',
            url: `api/Customer/GetCustomerTicketTransaction`,
            params: {
                id: customerId,
            },
            headers: authHeader(),
        })
        .then(response => {
            dispatch({ type: 'FETCH_CUSTOMER_TRANS', transactionList: response.data });
        })
    },
    // ticket transaction
    //     values is a list of tickets
    createTicketTransaction: (values, customerId, toastId): AppThunkAction<TransactionActions> => (dispatch, getState) => {
        dispatch({ type: 'TICKET_TRANSACTION_IN_PROGRESS'})
        // first create ticket transaction record
        axios({
            method: 'post',
            url: `api/Transaction/CreateNewTicketTransaction`,
            params: {
                customerId: customerId,
            },
            headers: authHeader(),
        })
        .then(transactionRes => { // transactionRes should contain transactionId
            // create ticket record for each ticket and 
            //     also create a ticketTransactionPurchase record
            //dispatch({ type: 'TICKET_TRANSACTION_CREATED', toastId: toastId});
            values.forEach(item => {
                axios({
                    method: 'post',
                    url: `api/Ticket/CreateNewTicket`,
                    data: item,
                    headers: authHeader()
                })
                .then(ticketRes => {
                    axios({
                        method: 'post',
                        url: `api/Transaction/CreateNewTransactionTicketPurchase`,
                        data: {
                            ticketId: ticketRes.data.ticketId,
                            transactionId: transactionRes.data.transactionId,
                        },
                        headers: authHeader()
                    })
                    .then(response => {
                        // remove ticket from ticketList
                        dispatch({ type: 'TICKET_CREATED', ticketId: ticketRes.data.ticketId, toastId: toastId})
                    })
                    .catch(error => {
                        // dispatch({ type: 'TICKET_TRANSACTION_FAIL', toastId: toastId });
                    })
                })
                .catch(error => {
                    // dispatch({ type: 'TICKET_TRANSACTION_FAIL', toastId: toastId });
                })
            })
        })
        .catch(error => {
            // dispatch({ type: 'TICKET_TRANSACTION_FAIL', toastId: toastId });
        })
    },
    // add or remove from transactionTotal and ticketList
    updateTransaction: (values): AppThunkAction<TransactionActions> => (dispatch, getState) => {
        dispatch({ type: 'UPDATE_TRANSACTION_TOTAL', 
            ticketList: values.ticketList, 
            transactionTotal: values.transactionTotal })
    },

    //set date    
    setDate: (values): AppThunkAction<TransactionActions> => (dispatch, getState) => {
        dispatch({ type: 'SET_DATE', 
            effectiveDate: values.effectiveDate })
    },

};

// Individual actions (these are used by functional components) 
// get a single customer by id
// TODO: MOVE THIS TO CUSTOMER ACTIONS 
export function requestCustomer(id) {
    return axios.get(`api/Customer/GetCustomer`, 
        { params: {
            id: id 
        }})
}

