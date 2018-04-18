import { ActionCreator } from 'redux';
import { AppThunkAction } from '../store/';
import { Customer } from '../models/_DataModels';
import { authHeader } from '../helpers/_authHeader'
import axios from 'axios';

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

export interface FetchCustomersActionInProgress {
    type: 'FETCH_CUSTOMERS_IN_PROGRESS';
}

export interface FetchCustomersActionSuccess {
    type: 'FETCH_CUSTOMERS_SUCCESS';
    customerList: Customer[];
}

export interface FetchCustomerAction {
    type: 'FETCH_CUSTOMER';
    customer: Customer;
}

export interface CreateCustomerSuccessAction {
    type: 'CREATE_CUSTOMER_SUCCESS';
    toastId: number;
}

export interface CreateCustomerFailureAction {
    type: 'CREATE_CUSTOMER_FAIL';
    toastId: number;
}

export interface UpdateCustomerActionSuccess {
    type: 'UPDATE_CUSTOMER_SUCCESS';
    toastId: number;
}

export interface UpdateCustomerActionFail {
    type: 'UPDATE_CUSTOMER_FAIL';
    toastId: number;
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).

export type CustomerActions = FetchCustomersActionInProgress | FetchCustomersActionSuccess |
    FetchCustomerAction | CreateCustomerSuccessAction | CreateCustomerFailureAction | UpdateCustomerActionSuccess |
    UpdateCustomerActionFail;

export type CustomerProfileActions = FetchCustomerAction |
    UpdateCustomerActionSuccess | UpdateCustomerActionFail;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {

    requestCustomersList: (): AppThunkAction<CustomerActions> => (dispatch, getState) => {
        dispatch({ type: 'FETCH_CUSTOMERS_IN_PROGRESS' });
        axios.get(`api/Customer/GetCustomers`)
        .then(response => {
            dispatch({ type: 'FETCH_CUSTOMERS_SUCCESS', customerList: response.data });
        })
        .catch(error => {
            //
        })
    }, 
    
    // get a single customer by id
    requestCustomer: (id): AppThunkAction<CustomerActions> => (dispatch, getState) => {
        axios.get(`api/Customer/GetCustomer`, id)
        .then(response => {
            dispatch({ type: 'FETCH_CUSTOMER', customer: response.data });
        })
        .catch(error => {
            // error dispatch goes here
        })
    },
    // get a single customer who is already logged in
    requestLoggedInCustomer: (): AppThunkAction<CustomerProfileActions> => (dispatch, getState) => {
        // get id of stored user
        let storedUser = null;
        let customerId = '';
        if (typeof window !== 'undefined') {
            storedUser = JSON.parse(localStorage.getItem('user'));
        }
        if (storedUser != null && storedUser.customerType !== 'undefined' ){
            customerId = storedUser.customerId;
        } 

        // pass in id as a parameter
        axios.get(`api/Customer/GetCustomer`, {
            params: {
                id: customerId
            }
        })
        .then(response => {
            dispatch({ type: 'FETCH_CUSTOMER', customer: response.data });
        })
        .catch(error => {
            // error dispatch goes here
        })
    },
    createNewCustomer: (values, toastId): AppThunkAction<CustomerActions> => (dispatch, getState) => {
        axios({
            method: 'post',
            url: `api/Customer/CreateNewCustomer`,
            data: values,
            headers: authHeader(),
        })
        .then(response => {
            dispatch({ type: 'CREATE_CUSTOMER_SUCCESS' , toastId: toastId});
        })
        .catch(error => {
            dispatch({ type: 'CREATE_CUSTOMER_FAIL', toastId: toastId });
        })
    },
    updateCustomer: (values, toastId): AppThunkAction<CustomerActions> => (dispatch, getState) => {
        axios({
            method: 'put',
            url: `api/Customer/UpdateCustomer`,
            data: values,
            headers: authHeader(),
        })
        .then(response => {
            dispatch({ type: 'UPDATE_CUSTOMER_SUCCESS', toastId: toastId });
        })
        .catch(error => {
            dispatch({ type: 'UPDATE_CUSTOMER_FAIL', toastId: toastId })
        })
    },
};

// Individual actions (these are used by functional components) 
// get a single customer by id
export function requestCustomer(id) {
    return axios.get(`api/Customer/GetCustomer`, 
        { params: {
            id: id 
        }})
}

// get multiple customers by array of ids
export function requestCustomers(ids) {
    var params = new URLSearchParams();
    ids.forEach(element => {
        params.append('id', element)
    })

    return axios.get(`api/Customer/GetCustomersById`, 
        { params: params })
}