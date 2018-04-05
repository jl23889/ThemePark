import { Action, Reducer } from 'redux';
import { RegisterActions, RegisterFormActions } from '../actions/_RegisterActions'

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface RegisterState {
    registering: boolean;
    disableCustomerForm: boolean,
    disableEmployeeForm: boolean,
}

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: RegisterState = { 
    registering: false,
    disableCustomerForm: true,
    disableEmployeeForm: true,
};

type KnownAction = RegisterActions | RegisterFormActions // list of known actions

export const reducer: Reducer<RegisterState> = (state: RegisterState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'USER_REGISTER_REQUEST':
            return {
                registering: true,
                disableCustomerForm: state.disableCustomerForm,
                disableEmployeeForm: state.disableEmployeeForm,
            }
        case 'USER_REGISTER_SUCCESS':
            return {
                registering: false,
                disableCustomerForm: state.disableCustomerForm,
                disableEmployeeForm: state.disableEmployeeForm,
            }
        case 'USER_REGISTER_FAIL':
            return {
                registering: false,
                disableCustomerForm: state.disableCustomerForm,
                disableEmployeeForm: state.disableEmployeeForm,
            }
        case 'SHOW_CUSTOMER_FORM':
            return {
                registering: state.registering,
                disableCustomerForm: false,
                disableEmployeeForm: true,
            }
        case 'SHOW_EMPLOYEE_FORM':
            return {
                registering: state.registering,
                disableCustomerForm: true,
                disableEmployeeForm: false,
            }
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};