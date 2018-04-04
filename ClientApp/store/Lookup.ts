import { Action, Reducer } from 'redux';
import { LookupActions } from '../actions/_LookupActions'

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface LookupState {
    lookupTable: string;
}

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: LookupState = { 
	lookupTable: ''
};

type KnownAction = LookupActions;

export const reducer: Reducer<LookupState> = (state: LookupState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        // rides
        case 'SELECT_LOOKUP_TABLE':
            return {
                lookupTable: action.selectedTable,
            }
        case 'DESELECT_LOOKUP_TABLE':
            return {
                lookupTable: state.lookupTable,
            }
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};