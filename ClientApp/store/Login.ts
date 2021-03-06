import { Action, Reducer } from 'redux';
import { LoginActions, LoginFormActions } from '../actions/_LoginActions'
import { Alert } from '../models/_DataModels'

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface LoginState {
    loggedIn: boolean;
    accessLevel: number;
    disableCustomerForm: boolean;
    disableEmployeeForm: boolean;
    loginAlert: Alert;
}

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: LoginState = { 
    loggedIn: false, // returns true if user object exists in localstorage
    accessLevel: 0,
    disableCustomerForm: true,
    disableEmployeeForm: true,
    loginAlert: null,
};

type KnownAction = LoginActions | LoginFormActions // list of known actions

export const reducer: Reducer<LoginState> = (state: LoginState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'USER_LOGIN_CHECK':
            return {
                loggedIn: action.userExists,
                accessLevel: action.accessLevel,
                disableCustomerForm: state.disableCustomerForm,
                disableEmployeeForm: state.disableEmployeeForm,
                loginAlert: state.loginAlert,
            }
        case 'USER_LOGIN_REQUEST':
            return {
                loggedIn: state.loggedIn,
                accessLevel: state.accessLevel,
                disableCustomerForm: state.disableCustomerForm,
                disableEmployeeForm: state.disableEmployeeForm,
                loginAlert: state.loginAlert,
            }
        case 'USER_LOGIN_SUCCESS':
            return {
                loggedIn: true,
                accessLevel: state.accessLevel,
                disableCustomerForm: state.disableCustomerForm,
                disableEmployeeForm: state.disableEmployeeForm,
                loginAlert: {
                    toastId: action.toastId,
                    alertType: 'success',
                    alertMessage: 'Login Successful',
                },
            }
        case 'USER_LOGIN_FAIL':
            return {
                loggedIn: false,
                accessLevel: state.accessLevel,
                disableCustomerForm: state.disableCustomerForm,
                disableEmployeeForm: state.disableEmployeeForm,
                loginAlert: {
                    toastId: action.toastId,
                    alertType: 'error',
                    alertMessage: 'Login Failed. Please try again',
                },
            }
        case 'USER_LOGOUT':
            return {
                loggedIn: false,
                accessLevel: 0,
                disableCustomerForm: state.disableCustomerForm,
                disableEmployeeForm: state.disableEmployeeForm,
                loginAlert: state.loginAlert,
            }
        case 'SHOW_CUSTOMER_FORM':
            return {
                loggedIn: state.loggedIn,
                accessLevel: state.accessLevel,
                disableCustomerForm: false,
                disableEmployeeForm: true,
                loginAlert: state.loginAlert,
            }
        case 'SHOW_EMPLOYEE_FORM':
            return {
                loggedIn: state.loggedIn,
                accessLevel: state.accessLevel,
                disableCustomerForm: true,
                disableEmployeeForm: false,
                loginAlert: state.loginAlert,
            }
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};