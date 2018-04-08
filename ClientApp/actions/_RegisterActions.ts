import { ActionCreator } from 'redux';
import { AppThunkAction } from '../store/';
import axios from 'axios';

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

export interface UserRegisterActionInProgress {
    type: 'USER_REGISTER_IN_PROGRESS';
}

export interface UserRegisterActionSuccess {
    type: 'USER_REGISTER_SUCCESS';
    toastId: number;
}

export interface UserRegisterActionFail {
    type: 'USER_REGISTER_FAIL';
    toastId: number;
}

export interface EnableCustomerFormAction {
    type: 'SHOW_CUSTOMER_FORM';
}

export interface EnableEmployeeFormAction {
    type: 'SHOW_EMPLOYEE_FORM';
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
export type RegisterActions =  UserRegisterActionInProgress 
    | UserRegisterActionSuccess | UserRegisterActionFail;

export type RegisterFormActions = EnableCustomerFormAction | EnableEmployeeFormAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    registerCustomer: (user, toastId): AppThunkAction<RegisterActions> => (dispatch, getState) => {
        dispatch({ type: 'USER_REGISTER_IN_PROGRESS' }); 

        // first create a new customer
        axios.post(`api/Customer/CreateNewCustomer`, user)
        .then(response => {
            // if customer creation is successful, create customer login
            user.customerId = response.data.customerId; // add customerId to user object
            axios.post(`api/CustomerUser/Register`, user)
            .then(response => {
                dispatch({ type: 'USER_REGISTER_SUCCESS', toastId: toastId });
            })
            .catch(error => {
                // delete the customer if unable to create customer login
                axios.post(`api/Customer/DeleteCustomer`, user);
                dispatch({ type: 'USER_REGISTER_FAIL', toastId: toastId });
            })
        })
        .catch(error => {
            dispatch({ type: 'USER_REGISTER_FAIL', toastId: toastId});
        })
        
    },

    registerEmployee: (user, toastId): AppThunkAction<RegisterActions> => (dispatch, getState) => {
        dispatch({ type: 'USER_REGISTER_IN_PROGRESS' }); 

        axios.post(`api/EmployeeUser/Register`, user)
        .then(response => {
            dispatch({ type: 'USER_REGISTER_SUCCESS', toastId: toastId });
        })
        .catch(error => {
            dispatch({ type: 'USER_REGISTER_FAIL', toastId: toastId });
        })
    },

    showCustomerForm: (user): AppThunkAction<RegisterFormActions> => (dispatch, getState) => {
        dispatch({ type: 'SHOW_CUSTOMER_FORM' }); 
    },

    showEmployeeForm: (user): AppThunkAction<RegisterFormActions> => (dispatch, getState) => {
        dispatch({ type: 'SHOW_EMPLOYEE_FORM' }); 
    },
};
