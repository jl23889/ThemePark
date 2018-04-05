import { Action, Reducer } from 'redux';
import { LoginNavMenuActions } from '../actions/_LoginActions'

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface NavMenuState {
    loggedIn: boolean;
    loginType: string;
}

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: NavMenuState = { 
    loggedIn: false, // returns true if user object exists in localstorage
    loginType: '',
};

type KnownAction =  LoginNavMenuActions // list of known actions

export const reducer: Reducer<NavMenuState> = (state: NavMenuState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
    	case 'USER_LOGIN_CHECK':
            return {
                loggedIn: action.userExists,
                loginType: action.userType,
            }
        case 'USER_LOGOUT':
            return {
                loggedIn: false,
                loginType: '',
            }
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};