import { Action, Reducer } from 'redux';
import { WeatherActions } from '../actions/_WeatherActions'
import { Alert, Weather } from '../models/_DataModels'

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface WeatherState {
    weatherAlert: Alert;
    weather: Weather;
    date: Weather;
    weatherList: Weather[];
    reloadWeathers: boolean;
}

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: WeatherState = {
    weatherAlert: null,
    weather: null,
    date: null,
    weatherList: [],
    reloadWeathers: true,
};

type KnownAction = WeatherActions // list of known actions

export const reducer: Reducer<WeatherState> = (state: WeatherState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'FETCH_WEATHERS_IN_PROGRESS':
            return {
                weatherAlert: state.weatherAlert,
                weather: state.weather,
                reloadWeathers: false,
                date: state.date,
                weatherList: state.weatherList
            }
        case 'FETCH_WEATHERS_SUCCESS':
            return {
                weatherAlert: state.weatherAlert,
                weather: state.weather,
                reloadWeathers: false,
                date: state.date,
                weatherList: action.weatherList
            }
        case 'FETCH_WEATHER_SUCCESS':
            return {
                weatherAlert: state.weatherAlert,
                weather: state.weather,
                reloadWeathers: state.reloadWeathers,
                date: state.date,
                weatherList: state.weatherList
            }
        case 'CREATE_WEATHER_SUCCESS':
            return {
                weather: state.weather,
                reloadWeathers: true,
                date: state.date,
                weatherAlert: {
                    'toastId': action.toastId,
                    'alertType': 'success',
                    'alertMessage': 'Created Weather Successfully'
                },
                weatherList: state.weatherList
            }

        case 'CREATE_WEATHER_FAIL':
            return {
                weather: state.weather,
                reloadWeathers: true,
                date: state.date,
                weatherAlert: {
                    'toastId': action.toastId,
                    'alertType': 'error',
                    'alertMessage': 'Could not create weather. Please try again!'
                },
                weatherList: state.weatherList
            }
        case 'UPDATE_WEATHER_SUCCESS':
            return {
                weather: state.weather,
                reloadWeathers: true,
                date: state.date,
                weatherAlert: {
                    'toastId': action.toastId,
                    'alertType': 'success',
                    'alertMessage': 'Updated Weather Successfully'
                },
                weatherList: state.weatherList
            }
        case 'UPDATE_WEATHER_FAIL':
            return {
                weather: state.weather,
                reloadWeathers: false,
                date: state.date,
                weatherAlert: {
                    'toastId': action.toastId,
                    'alertType': 'error',
                    'alertMessage': 'Could not update weather. Please try again!'
                },
                weatherList: state.weatherList
            }
        case 'DELETE_WEATHER_SUCCESS':
            return {
                weather: state.weather,
                reloadWeathers: true,
                date: state.date,
                weatherAlert: {
                    'toastId': action.toastId,
                    'alertType': 'success',
                    'alertMessage': 'Deleted Weather Successfully'
                },
                weatherList: state.weatherList
            }
        case 'DELETE_WEATHER_FAIL':
            return {
                weather: state.weather,
                reloadWeathers: true,
                date: state.date,
                weatherAlert: {
                    'toastId': action.toastId,
                    'alertType': 'error',
                    'alertMessage': 'Could not update weather. Please try again!'
                },
                weatherList: state.weatherList
            }
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};