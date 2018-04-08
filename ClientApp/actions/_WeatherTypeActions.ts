import { ActionCreator } from 'redux';
import { AppThunkAction } from '../store/';
import { WeatherType } from '../models/_DataModels'
import axios from 'axios';

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

export interface FetchWeatherTypeAction {
    type: 'FETCH_WEATHER_TYPE';
    weatherTypeList: WeatherType[];
}

export interface CreateWeatherTypeAction {
    type: 'CREATE_WEATHER_TYPE';
}

export interface UpdateWeatherTypeAction {
    type: 'UPDATE_WEATHER_TYPE';
}

export interface DeleteWeatherTypeAction {
    type: 'DELETE_WEATHER_TYPE';
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
export type WeatherTypeActions = FetchWeatherTypeAction | CreateWeatherTypeAction
    | UpdateWeatherTypeAction | DeleteWeatherTypeAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    requestWeatherTypeList: (): AppThunkAction<WeatherTypeActions> => (dispatch, getState) => {
        // Only load data if reload flag is true
        if (getState().weatherType.reloadData) {
            axios.get(`api/WeatherType/LookUpWeatherType`)
                .then(response => {
                    dispatch({ type: 'FETCH_WEATHER_TYPE', weatherTypeList: response.data });
                })
        }
    },
    createNewWeatherType: (values): AppThunkAction<WeatherTypeActions> => (dispatch, getState) => {
        axios.post(`api/WeatherType/CreateNewWeatherType`, values)
            .then(
            response => {
                dispatch({ type: 'CREATE_WEATHER_TYPE' });
            }
            );
    },
    updateWeatherType: (values): AppThunkAction<WeatherTypeActions> => (dispatch, getState) => {
        axios.put(`api/WeatherType/UpdateWeatherType`, values)
            .then(
            response => {
                dispatch({ type: 'UPDATE_WEATHER_TYPE' });
            }
            );
    },
    deleteWeatherType: (values): AppThunkAction<WeatherTypeActions> => (dispatch, getState) => {
        // id is the WeatherTypeId
        axios.post(`api/WeatherType/DeleteWeatherType`, values)
            .then(
            response => {
                dispatch({ type: 'DELETE_WEATHER_TYPE' });
            }
            );
    }
};