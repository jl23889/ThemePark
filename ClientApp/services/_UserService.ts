import { authHeader } from '../helpers/_authHeader';

import axios from 'axios';

export const userService = {
    login: (username, password, loginType) => {
        var url = 'api/CustomerUser/Authenticate'      
        if (loginType = 'employee') {
            url='api/EmployeeUser/Authenticate'
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify({username, password})
        }

        return fetch(url, requestOptions)
            .then(handleResponse, handleError)
            .then(user => {
                // login successful if theres a jwt token in response
                if (user) {
                    // ensure actions are done client side (prevent prerendering)
                    if (typeof window !== 'undefined') {

                        // store user details and jwt token in local storage to keep user loggedin
                        localStorage.setItem('user', JSON.stringify(user));
                    }
                }
                return user; 
            });
    },

    logout: () => {
        // ensure actions are done client side (prevent prerendering)
        if (typeof window !== 'undefined') {

            localStorage.removeItem('user');
        }
    },

    register: (user, registerType) => {
        var url = 'api/CustomerUser/Register'      
        if (registerType = 'employee') {
            url='api/EmployeeUser/Register'
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        };

        return fetch(url, requestOptions)
            .then(handleResponse, handleError);
    }
}

function handleResponse(response) {
    return new Promise((resolve, reject) => {
        if (response.ok) {
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                response.json().then(json => resolve(json));
            } else {
                resolve();
            }
        } else {
            // return error message from response body
            response.text().then(text => reject(text));
        }
    });
}

function handleError(error) {
    return Promise.reject(error && error.message);
}