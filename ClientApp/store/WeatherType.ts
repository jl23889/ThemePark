import { Action, Reducer } from 'redux';
import { WeatherTypeActions } from '../actions/_WeatherTypeActions'
import { WeatherType } from '../models/_DataModels'

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface WeatherTypeState {
    reloadData: boolean;
    weatherTypeList: WeatherType[];
}

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: WeatherTypeState = {
    weatherTypeList: [],
    reloadData: true
};

type KnownAction = WeatherTypeActions // list of known actions

export const reducer: Reducer<WeatherTypeState> = (state: WeatherTypeState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'FETCH_WEATHER_TYPE':
            return {
                weatherTypeList: action.weatherTypeList,
                reloadData: false
            }
        case 'CREATE_WEATHER_TYPE':
            return {
                weatherTypeList: state.weatherTypeList,
                reloadData: true
            }
        case 'UPDATE_WEATHER_TYPE':
            return {
                weatherTypeList: state.weatherTypeList,
                reloadData: true
            }
        case 'DELETE_WEATHER_TYPE':
            return {
                weatherTypeList: state.weatherTypeList,
                reloadData: true
            }
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};