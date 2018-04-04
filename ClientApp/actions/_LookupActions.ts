import { ActionCreator } from 'redux';
import { AppThunkAction } from '../store/';

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

export interface SelectLookupTableAction {
    type: 'SELECT_LOOKUP_TABLE';
    selectedTable: string;
}

export interface DeselectLookupTableAction {
    type: 'DESELECT_LOOKUP_TABLE';
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).

export type LookupActions =  SelectLookupTableAction | DeselectLookupTableAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    selectLookupTable: (lut): AppThunkAction<SelectLookupTableAction> => (dispatch, getState) => {
        dispatch({ type: 'SELECT_LOOKUP_TABLE', selectedTable: lut });       
    },
};