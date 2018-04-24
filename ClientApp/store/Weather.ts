import { Action, Reducer } from 'redux';
import { WeatherActions } from '../actions/_WeatherActions'
import { Alert, Weather } from '../models/_DataModels'

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface WeatherState {
    loadingWeatherList: boolean;
    weatherAlert: Alert;
    weather: Weather;
    weatherList: Weather[];
    date: Weather;
    reloadWeathers: boolean;
}

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: WeatherState = {
    loadingWeatherList: false,
    weatherAlert: null,
    weather: null,
    weatherList: [],
    date: null,
    reloadWeathers: true,
};

type KnownAction = WeatherActions // list of known actions

export const reducer: Reducer<WeatherState> = (state: WeatherState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'FETCH_WEATHERS_IN_PROGRESS':
            return {
                loadingWeatherList: true,
                weatherAlert: state.weatherAlert,
                weather: state.weather,
                weatherList: state.weatherList,
                reloadWeathers: false,
                date: state.date,
            }
        case 'FETCH_WEATHERS_SUCCESS':
            return {
                loadingWeatherList: true,
                weatherAlert: state.weatherAlert,
                weather: state.weather,
                weatherList: state.weatherList,
                reloadWeathers: false,
                date: state.date,
            }
        case 'FETCH_WEATHER_SUCCESS':
            return {
                loadingWeatherList: state.loadingWeatherList,
                weatherAlert: state.weatherAlert,
                weather: state.weather,
                weatherList: state.weatherList,
                reloadWeathers: state.reloadWeathers,
                date: state.date,
            }
        case 'CREATE_WEATHER_SUCCESS':
            return {
                loadingWeatherList: state.loadingWeatherList,
                weather: state.weather,
                weatherList: state.weatherList,
                reloadWeathers: true,
                date: state.date,
                weatherAlert: {
                    'toastId': action.toastId,
                    'alertType': 'success',
                    'alertMessage': 'Created Weather Successfully'
                },
            }

        case 'CREATE_WEATHER_FAIL':
            return {
                loadingWeatherList: state.loadingWeatherList,
                weather: state.weather,
                weatherList: state.weatherList,
                reloadWeathers: true,
                date: state.date,
                weatherAlert: {
                    'toastId': action.toastId,
                    'alertType': 'error',
                    'alertMessage': 'Could not create weather. Please try again!'
                },
            }
        case 'UPDATE_WEATHER_SUCCESS':
            return {
                loadingWeatherList: state.loadingWeatherList,
                weather: state.weather,
                weatherList: state.weatherList,
                reloadWeathers: true,
                date: state.date,
                weatherAlert: {
                    'toastId': action.toastId,
                    'alertType': 'success',
                    'alertMessage': 'Updated Weather Successfully'
                },
            }
        case 'UPDATE_WEATHER_FAIL':
            return {
                loadingWeatherList: state.loadingWeatherList,
                weather: state.weather,
                weatherList: state.weatherList,
                reloadWeathers: false,
                date: state.date,
                weatherAlert: {
                    'toastId': action.toastId,
                    'alertType': 'error',
                    'alertMessage': 'Could not update weather. Please try again!'
                },
            }
        case 'DELETE_WEATHER_SUCCESS':
            return {
                loadingWeatherList: state.loadingWeatherList,
                weather: state.weather,
                weatherList: state.weatherList,
                reloadWeathers: true,
                date: state.date,
                weatherAlert: {
                    'toastId': action.toastId,
                    'alertType': 'success',
                    'alertMessage': 'Deleted Weather Successfully'
                },
            }
        case 'DELETE_WEATHER_FAIL':
            return {
                loadingWeatherList: state.loadingWeatherList,
                weather: state.weather,
                weatherList: state.weatherList,
                reloadWeathers: true,
                date: state.date,
                weatherAlert: {
                    'toastId': action.toastId,
                    'alertType': 'error',
                    'alertMessage': 'Could not update weather. Please try again!'
                },
            }
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};