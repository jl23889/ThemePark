import { ActionCreator } from 'redux';
import { AppThunkAction } from '../store/';
import { Weather } from '../models/_DataModels';
import { authHeader } from '../helpers/_authHeader'
import axios from 'axios';

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

export interface FetchWeathersActionInProgress {
    type: 'FETCH_WEATHERS_IN_PROGRESS';
}

export interface FetchWeathersActionSuccess {
    type: 'FETCH_WEATHERS_SUCCESS';
    weatherList: Weather[];
}

export interface FetchWeatherActionSuccess {
    type: 'FETCH_WEATHER_SUCCESS';
    weather: Weather;
}

export interface CreateWeatherActionSuccess {
    type: 'CREATE_WEATHER_SUCCESS';
    toastId: number;
}

export interface CreateWeatherActionFail {
    type: 'CREATE_WEATHER_FAIL';
    toastId: number;
}

export interface UpdateWeatherActionSuccess {
    type: 'UPDATE_WEATHER_SUCCESS';
    toastId: number;
}

export interface UpdateWeatherActionFail {
    type: 'UPDATE_WEATHER_FAIL';
    weatherSelected: Weather;
    toastId: number;
}

export interface DeleteWeatherActionSuccess {
    type: 'DELETE_WEATHER_SUCCESS';
    toastId: number;
}

export interface DeleteWeatherActionFail {
    type: 'DELETE_WEATHER_FAIL';
    weatherSelected: Weather;
    toastId: number;
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).

export type WeatherActions = FetchWeathersActionInProgress |
    FetchWeathersActionSuccess | FetchWeatherActionSuccess |
    CreateWeatherActionSuccess | CreateWeatherActionFail | UpdateWeatherActionSuccess | UpdateWeatherActionFail |
    UpdateWeatherActionFail | DeleteWeatherActionSuccess | DeleteWeatherActionFail;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    // Weathers 

    // get all weathers 
    requestWeatherList: (): AppThunkAction<WeatherActions> => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        axios.get(`api/Weather/GetWeathers`)
        .then(response => {
            dispatch({ type: 'FETCH_WEATHERS_SUCCESS', weatherList: response.data });
        })
    },

    // get a single ride by id
    requestWeather: (id): AppThunkAction<WeatherActions> => (dispatch, getState) => {
        axios.get(`api/Weather/GetWeather`, id)
            .then(response => {
                dispatch({ type: 'FETCH_WEATHER_SUCCESS', weather: response.data });
            })
            .catch(error => {
                // error dispatch goes here
            })
    },

    createNewWeather: (values, toastId): AppThunkAction<WeatherActions> => (dispatch, getState) => {
        // set default weatherStatus to open
        values.status = 1;

        axios({
            method: 'post',
            url: `api/weather/CreateNewweather`,
            data: values,
            headers: authHeader(),
        })
            .then(response => {
                dispatch({ type: 'CREATE_WEATHER_SUCCESS', toastId: toastId });
            })
            .catch(error => {
                dispatch({ type: 'CREATE_WEATHER_FAIL', toastId: toastId });
            })
    },
    updateWeather: (values, toastId): AppThunkAction<WeatherActions> => (dispatch, getState) => {
        axios({
            method: 'put',
            url: `api/weather/UpdateWeather`,
            data: values,
            headers: authHeader(),
        })
            .then(response => {
                dispatch({ type: 'UPDATE_WEATHER_SUCCESS', toastId: toastId });
            })
            .catch(error => {
                dispatch({ type: 'UPDATE_WEATHER_FAIL', weatherSelected: values, toastId: toastId })
            })
    },

    deleteWeather: (values, toastId): AppThunkAction<WeatherActions> => (dispatch, getState) => {
        // id is the weatherId
        axios({
            method: 'post',
            url: `api/weather/DeleteWeather`,
            data: values,
            headers: authHeader(),
        })
            .then(response => {
                dispatch({ type: 'DELETE_WEATHER_SUCCESS', toastId: toastId });
            })
            .catch(error => {
                dispatch({ type: 'DELETE_WEATHER_FAIL', weatherSelected: values, toastId: toastId });
            })
    },
};

// Individual actions (these are used by functional components) 
// get a single employee by id
export function requestWeather(id) {
    return axios.get(`api/Weather/GetWeather`,
        {
            params: {
                date: Date
            }
        })
}