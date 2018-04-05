import { Action, Reducer } from 'redux';
import { LoginActions, LoginFormActions } from '../actions/_LoginActions'

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface LoginState {
    loggingIn: boolean;
    loggedIn: boolean;
    accessLevel: number;
    disableCustomerForm: boolean;
    disableEmployeeForm: boolean;
}

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: LoginState = { 
    loggedIn: false, // returns true if user object exists in localstorage
    loggingIn: false,
    accessLevel: 0,
    disableCustomerForm: true,
    disableEmployeeForm: true
};

type KnownAction = LoginActions | LoginFormActions // list of known actions

export const reducer: Reducer<LoginState> = (state: LoginState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'USER_LOGIN_CHECK':
            return {
                loggedIn: action.userExists,
                loggingIn: state.loggingIn,
                accessLevel: action.accessLevel,
                disableCustomerForm: state.disableCustomerForm,
                disableEmployeeForm: state.disableEmployeeForm,
            }
        case 'USER_LOGIN_REQUEST':
            return {
                loggedIn: state.loggedIn,
                loggingIn: state.loggingIn,
                accessLevel: state.accessLevel,
                disableCustomerForm: state.disableCustomerForm,
                disableEmployeeForm: state.disableEmployeeForm,
            }
        case 'USER_LOGIN_REQUEST':
            return {
                loggedIn: state.loggedIn,
                loggingIn: state.loggingIn,
                accessLevel: state.accessLevel,
                disableCustomerForm: state.disableCustomerForm,
                disableEmployeeForm: state.disableEmployeeForm,
            }
        case 'USER_LOGIN_SUCCESS':
            return {
                loggedIn: true,
                loggingIn: false,
                accessLevel: state.accessLevel,
                disableCustomerForm: state.disableCustomerForm,
                disableEmployeeForm: state.disableEmployeeForm,
            }
        case 'USER_LOGIN_FAIL':
            return {
                loggedIn: false,
                loggingIn: false,
                accessLevel: state.accessLevel,
                disableCustomerForm: state.disableCustomerForm,
                disableEmployeeForm: state.disableEmployeeForm,
            }
        case 'USER_LOGOUT':
            return {
                loggedIn: false,
                loggingIn: false,
                accessLevel: 0,
                disableCustomerForm: state.disableCustomerForm,
                disableEmployeeForm: state.disableEmployeeForm,
            }
        case 'SHOW_CUSTOMER_FORM':
            return {
                loggedIn: state.loggedIn,
                loggingIn: state.loggingIn,
                accessLevel: state.accessLevel,
                disableCustomerForm: false,
                disableEmployeeForm: true,
            }
        case 'SHOW_EMPLOYEE_FORM':
            return {
                loggedIn: state.loggedIn,
                loggingIn: state.loggingIn,
                accessLevel: state.accessLevel,
                disableCustomerForm: true,
                disableEmployeeForm: false,
            }
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};