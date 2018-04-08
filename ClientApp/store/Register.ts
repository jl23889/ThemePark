import { Action, Reducer } from 'redux';
import { RegisterActions, RegisterFormActions } from '../actions/_RegisterActions'

import { Alert } from '../models/_DataModels'

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface RegisterState {
    registering: boolean;
    disableCustomerForm: boolean;
    disableEmployeeForm: boolean;
    registerAlert: Alert;
}

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: RegisterState = { 
    registering: false,
    disableCustomerForm: true,
    disableEmployeeForm: true,
    registerAlert: null,
};

type KnownAction = RegisterActions | RegisterFormActions // list of known actions

export const reducer: Reducer<RegisterState> = (state: RegisterState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'USER_REGISTER_IN_PROGRESS':
            return {
                registering: true,
                disableCustomerForm: state.disableCustomerForm,
                disableEmployeeForm: state.disableEmployeeForm,
                registerAlert: state.registerAlert,
            }
        case 'USER_REGISTER_SUCCESS':
            return {
                registering: false,
                disableCustomerForm: state.disableCustomerForm,
                disableEmployeeForm: state.disableEmployeeForm,
                registerAlert: {
                    'toastId': action.toastId,
                    'alertType': 'success',
                    'alertMessage': 'Registration Successful'
                },
            }
        case 'USER_REGISTER_FAIL':
            return {
                registering: false,
                disableCustomerForm: state.disableCustomerForm,
                disableEmployeeForm: state.disableEmployeeForm,
                registerAlert: {
                    'toastId': action.toastId,
                    'alertType': 'error',
                    'alertMessage': 'Registration Failed! Please try again'
                },
            }
        case 'SHOW_CUSTOMER_FORM':
            return {
                registering: state.registering,
                disableCustomerForm: false,
                disableEmployeeForm: true,
                registerAlert: state.registerAlert,
            }
        case 'SHOW_EMPLOYEE_FORM':
            return {
                registering: state.registering,
                disableCustomerForm: true,
                disableEmployeeForm: false,
                registerAlert: state.registerAlert,
            }
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};