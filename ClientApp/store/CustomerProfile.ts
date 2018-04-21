import { Action, Reducer } from 'redux';
import { CustomerProfileActions } from '../actions/_CustomerActions'
import { UserLogoutAction, UserLoggedInCheckAction } from '../actions/_LoginActions'

import { Alert, Customer } from '../models/_DataModels'

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface CustomerProfileState {
    customer: Customer;
    reloadCustomer: boolean;
    customerAlert: Alert;
}
// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: CustomerProfileState = {
    customer: null,
    reloadCustomer: true,
    customerAlert: null
};

type KnownAction = CustomerProfileActions | 
    UserLogoutAction | UserLoggedInCheckAction;

export const reducer: Reducer<CustomerProfileState> = (state: CustomerProfileState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        // customers
        case 'FETCH_CUSTOMER':
            return {
                customer: action.customer,
                reloadCustomer: false,
                customerAlert: state.customerAlert
            }
        case 'UPDATE_CUSTOMER_SUCCESS':
            return {
                customer: state.customer,
                reloadCustomer: true,
                customerAlert: {
                    'toastId': action.toastId,
                    'alertType': 'success',
                    'alertMessage': 'Update Successful'
                },
            }
        case 'UPDATE_CUSTOMER_FAIL':
            return {
                customer: state.customer,
                reloadCustomer: false,
                customerAlert: {
                    'toastId': action.toastId,
                    'alertType': 'error',
                    'alertMessage': 'Update Failed! Please try again'
                },
            }
        case 'USER_LOGOUT':
            return {
                customer: null,
                reloadCustomer: false,
                customerAlert: state.customerAlert
            }
        case 'USER_LOGIN_CHECK':
            return {
                customer: state.customer,
                reloadCustomer: false,
                customerAlert: state.customerAlert
            }

        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};