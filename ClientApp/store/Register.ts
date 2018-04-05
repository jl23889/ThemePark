import { Action, Reducer } from 'redux';
import { RegisterActions } from '../actions/_RegisterActions'

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface RegisterState {
    registering: boolean;
}

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

let user = null

// ensure actions are done client side (prevent prerendering)
if (typeof window !== 'undefined') {
    user = JSON.parse(localStorage.getItem('user'));
}

const unloadedState: RegisterState = { 
    registering: false,
};

type KnownAction = RegisterActions // list of known actions

export const reducer: Reducer<RegisterState> = (state: RegisterState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'USER_REGISTER_REQUEST':
            return {
                registering: true
            }
        case 'USER_REGISTER_SUCCESS':
            return {
                registering: false
            }
        case 'USER_REGISTER_FAIL':
            return {
                registering: false,
            }
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};