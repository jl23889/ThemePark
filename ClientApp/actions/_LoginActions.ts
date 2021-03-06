import { ActionCreator } from 'redux';
import { AppThunkAction } from '../store/';

import axios from 'axios';

// we import the top level history object so we can redirect using actions
import { history } from '../boot-client';

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

export interface UserLoggedInCheckAction {
    type: 'USER_LOGIN_CHECK';
    userExists : boolean;
    accessLevel: number; //this is the employeeType as a number
    // this determines employee's level of access to certain functions
    // 0 is customers
    // 1 is admin level
    // 2+ is all other employees
}

export interface UserLoginRequestAction {
    type: 'USER_LOGIN_REQUEST';
}

export interface UserLoginSuccessAction {
    type: 'USER_LOGIN_SUCCESS';
    toastId: number;
}

export interface UserLoginFailAction {
    type: 'USER_LOGIN_FAIL';
    toastId: number;
}

export interface UserLogoutAction {
    type: 'USER_LOGOUT';
}

export interface EnableCustomerFormAction {
    type: 'SHOW_CUSTOMER_FORM';
}

export interface EnableEmployeeFormAction {
    type: 'SHOW_EMPLOYEE_FORM';
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
export type LoginActions =  UserLoggedInCheckAction | UserLoginRequestAction | UserLoginSuccessAction 
    | UserLoginFailAction | UserLogoutAction;

export type LoginFormActions = EnableCustomerFormAction | EnableEmployeeFormAction;

export type LoginNavMenuActions = UserLoggedInCheckAction | UserLogoutAction; // used in navbar

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    loginCustomer: (username, password, toastId): AppThunkAction<LoginActions> => (dispatch, getState) => {
        dispatch({ type: 'USER_LOGIN_REQUEST' }); 

        // create an object before passing to api
        let user = {
            CustomerUserName: username,
            CustomerPassword: password
        }

        axios.post(`api/CustomerUser/Authenticate`, user)
        .then(response => {
            // login successful if theres a jwt token in response
            if (response && response.data && response.data.token) {
                // ensure actions are done client side (prevent prerendering)
                if (typeof window !== 'undefined') {

                    // store user details and jwt token in local storage to keep user loggedin
                    localStorage.setItem('user', JSON.stringify(response.data));
                }
            }
            dispatch({ type: 'USER_LOGIN_SUCCESS', toastId: toastId });
        })
        .catch(error => {
            dispatch({ type: 'USER_LOGIN_FAIL', toastId: toastId });
        })
    },
    loginEmployee: (username, password, toastId): AppThunkAction<LoginActions> => (dispatch, getState) => {
        dispatch({ type: 'USER_LOGIN_REQUEST' }); 

        // create an object before passing to api
        let user = {
            EmployeeUserName: username,
            EmployeePassword: password
        }

        axios.post(`api/EmployeeUser/Authenticate`, user)
        .then(response => {
            // login successful if theres a jwt token in response
            if (response) {
                // ensure actions are done client side (prevent prerendering)
                if (typeof window !== 'undefined') {

                    // store user details and jwt token in local storage to keep user loggedin
                    localStorage.setItem('user', JSON.stringify(response.data));
                }
            }
            dispatch({ type: 'USER_LOGIN_SUCCESS', toastId: toastId });

        })
        .catch(error => {
            dispatch({ type: 'USER_LOGIN_FAIL', toastId: toastId });
        })
    },
    logout: (): AppThunkAction<LoginActions> => (dispatch, getState) => {
        // ensure actions are done client side (prevent prerendering)
        if (typeof window !== 'undefined') {

            localStorage.removeItem('user');
        }
        dispatch({ type: 'USER_LOGOUT'})
        // history.push('/');
    },
    checkLoggedIn: (): AppThunkAction<LoginActions> => (dispatch, getState) => {
        // ensure actions are done client side (prevent prerendering)
        let storedUser = null;

        if (typeof window !== 'undefined') {
            storedUser = JSON.parse(localStorage.getItem('user'));
        }
        var userExists = false;
        var accessLevel = 0;
        if (storedUser != null && storedUser.employeeType !== 'undefined' ){
            userExists = true;
            accessLevel = storedUser.employeeType;

        } else if (storedUser != null && storedUser.customerId !== 'undefined') {
            userExists = true;
        }

        console.log(accessLevel);
        dispatch({ type: 'USER_LOGIN_CHECK', 
            userExists: userExists, 
            accessLevel: accessLevel});
    },
    showCustomerForm: (user): AppThunkAction<LoginFormActions> => (dispatch, getState) => {
        dispatch({ type: 'SHOW_CUSTOMER_FORM' }); 
    },

    showEmployeeForm: (user): AppThunkAction<LoginFormActions> => (dispatch, getState) => {
        dispatch({ type: 'SHOW_EMPLOYEE_FORM' }); 
    },
};
