import { ActionCreator } from 'redux';
import { AppThunkAction } from '../store/';
import { userService } from '../services/_userService';
import { User } from '../models/_DataModels'

import axios from 'axios';

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

export interface UserLoginRequestAction {
    type: 'USER_LOGIN_REQUEST';
    loggingIn: true;
}

export interface UserLoginSuccessAction {
    type: 'USER_LOGIN_SUCCESS';
    loggedIn: true;
    user: User
}

export interface UserLoginFailAction {
    type: 'USER_LOGIN_FAIL';
    loggedIn: false;
}

export interface UserLogoutAction {
    type: 'USER_LOGOUT';
    loggedIn: false;
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
export type LoginActions =  UserLoginRequestAction | UserLoginSuccessAction 
    | UserLoginFailAction | UserLogoutAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    login: (username, password, loginType): AppThunkAction<LoginActions> => (dispatch, getState) => {
        return dispatch => {
            dispatch(request({username}));

            userService.login(username, password, loginType) 
                .then(
                    user => {
                        dispatch(success(user));
                    },
                    error => {
                        dispatch(fail(error));
                    }
                );
        };

        function request(username) { return { type: 'USER_LOGIN_REQUEST', username }}
        function success(user) { return { type: 'USER_LOGIN_SUCCESS', user }}
        function fail(error) { return { type: 'USER_LOGIN_FAIL', error }}
    },
    logout: (): AppThunkAction<LoginActions> => (dispatch, getState) => {
        userService.logout();
        return { type: 'USER_LOGOUT'}
    },
};
