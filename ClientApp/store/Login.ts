import { Action, Reducer } from 'redux';
import { LoginActions } from '../actions/_LoginActions'
import { User } from '../models/_DataModels'

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface LoginState {
    loggingIn: boolean;
    loggedIn: boolean;
    user: User
}

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

let user = null

// ensure actions are done client side (prevent prerendering)
if (typeof window !== 'undefined') {
    user = JSON.parse(localStorage.getItem('user'));
}

const unloadedState: LoginState = { 
    loggedIn: user ? true : false, // returns true if user object exists in localstorage
    loggingIn: false,
    user: {username: '', password: '', type: ''}
};

type KnownAction = LoginActions // list of known actions

export const reducer: Reducer<LoginState> = (state: LoginState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'USER_LOGIN_REQUEST':
            return {
                loggedIn: state.loggedIn,
                loggingIn: state.loggingIn,
                user: state.user
            }
        case 'USER_LOGIN_SUCCESS':
            return {
                loggedIn: true,
                loggingIn: false,
                user: action.user
            }
        case 'USER_LOGIN_FAIL':
            return {
                loggedIn: false,
                loggingIn: false,
                user: {username: '', password: '', type: ''} 
            }
        case 'USER_LOGOUT':
            return {
                loggedIn: false,
                loggingIn: false,
                user: {username: '', password: '', type: ''} 
            }
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};