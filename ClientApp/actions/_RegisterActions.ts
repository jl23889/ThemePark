import { ActionCreator } from 'redux';
import { AppThunkAction } from '../store/';
import { userService } from '../services/_userService';
import axios from 'axios';

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

export interface UserRegisterRequestAction {
    type: 'USER_REGISTER_REQUEST';
}

export interface UserRegisterSuccessAction {
    type: 'USER_REGISTER_SUCCESS';
    loggedIn: true;
}

export interface UserRegisterFailAction {
    type: 'USER_REGISTER_FAIL';
    loggedIn: false;
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
export type RegisterActions =  UserRegisterRequestAction 
    | UserRegisterSuccessAction | UserRegisterFailAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    register: (user, registerType): AppThunkAction<RegisterActions> => (dispatch, getState) => {
        return dispatch => {
            dispatch(request(user));

            userService.register(user, registerType) 
                .then(
                    user => {
                        dispatch(success(user));
                    },
                    error => {
                        dispatch(fail(error));
                    }
                );
        };

        function request(user) { return { type: 'USER_REGISTER_REQUEST', user }}
        function success(user) { return { type: 'USER_REGISTER_SUCCESS', user }}
        function fail(error) { return { type: 'USER_REGISTER_FAIL', error }}
    },
};
