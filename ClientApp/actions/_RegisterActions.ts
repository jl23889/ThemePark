import { ActionCreator } from 'redux';
import { AppThunkAction } from '../store/';
import axios from 'axios';

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

export interface UserRegisterRequestAction {
    type: 'USER_REGISTER_REQUEST';
}

export interface UserRegisterSuccessAction {
    type: 'USER_REGISTER_SUCCESS';
}

export interface UserRegisterFailAction {
    type: 'USER_REGISTER_FAIL';
}

export interface EnableCustomerFormAction {
    type: 'SHOW_CUSTOMER_FORM';
}

export interface EnableEmployeeFormAction {
    type: 'SHOW_EMPLOYEE_FORM';
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
export type RegisterActions =  UserRegisterRequestAction 
    | UserRegisterSuccessAction | UserRegisterFailAction;

export type RegisterFormActions = EnableCustomerFormAction | EnableEmployeeFormAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    registerCustomer: (user): AppThunkAction<RegisterActions> => (dispatch, getState) => {
        dispatch({ type: 'USER_REGISTER_REQUEST' }); 

        axios.post(`api/CustomerUser/Register`, user)
        .then(response => {
            dispatch({ type: 'USER_REGISTER_SUCCESS' });
        })
        .catch(error => {
            dispatch({ type: 'USER_REGISTER_FAIL' });
        })
    },

    registerEmployee: (user): AppThunkAction<RegisterActions> => (dispatch, getState) => {
        dispatch({ type: 'USER_REGISTER_REQUEST' }); 

        axios.post(`api/EmployeeUser/Register`, user)
        .then(response => {
            dispatch({ type: 'USER_REGISTER_SUCCESS' });
        })
        .catch(error => {
            dispatch({ type: 'USER_REGISTER_FAIL' });
        })
    },

    showCustomerForm: (user): AppThunkAction<RegisterFormActions> => (dispatch, getState) => {
        dispatch({ type: 'SHOW_CUSTOMER_FORM' }); 
    },

    showEmployeeForm: (user): AppThunkAction<RegisterFormActions> => (dispatch, getState) => {
        dispatch({ type: 'SHOW_EMPLOYEE_FORM' }); 
    },
};
