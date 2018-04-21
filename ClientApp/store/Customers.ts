import { Action, Reducer } from 'redux';
import { CustomerActions } from '../actions/_CustomerActions'
import { Alert, Customer} from '../models/_DataModels'

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface CustomersState {
    loadingCustomerList: boolean;
    customerList: Customer[];
    customerSelected: Customer;
    reloadCustomers: boolean;
    customerAlert: Alert;
}

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: CustomersState = { 
    loadingCustomerList: false,
    customerList: [],
    customerSelected: null,
    reloadCustomers: true,
    customerAlert: null,

};

type KnownAction = CustomerActions;

export const reducer: Reducer<CustomersState> = (state: CustomersState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {

        // customers
        case 'FETCH_CUSTOMERS_IN_PROGRESS':
            return {
                loadingCustomerList: true,
                customerList: state.customerList,
                customerSelected: state.customerSelected,
                reloadCustomers: false,
                customerAlert: state.customerAlert,
            }

        case 'FETCH_CUSTOMERS_SUCCESS':
            return {
                loadingCustomerList: false,
                customerList: action.customerList,
                customerSelected: state.customerSelected,
                reloadCustomers: false,
                customerAlert: state.customerAlert,
            }

        case 'FETCH_CUSTOMER':
            return {
                loadingCustomerList: state.loadingCustomerList,
                customerList: state.customerList,
                customerSelected: action.customer,
                reloadCustomers: state.reloadCustomers,
                customerAlert: state.customerAlert,
            }

        case 'CREATE_CUSTOMER_SUCCESS':
            return {
                loadingCustomerList: state.loadingCustomerList,
                customerList: state.customerList,
                customerSelected: state.customerSelected,
                reloadCustomers: true,
                customerAlert: {
                    'toastId': action.toastId,
                    'alertType': 'success',
                    'alertMessage': 'Created Customer Successfully'
                },

            }

        case 'CREATE_CUSTOMER_FAIL':
            return {
                loadingCustomerList: state.loadingCustomerList,
                customerList: state.customerList,
                customerSelected: state.customerSelected,
                reloadCustomers: true,
                customerAlert: {
                    'toastId': action.toastId,
                    'alertType': 'error',
                    'alertMessage': 'COuld not create Customer. Please Try Again!'
                },

            }

        case 'UPDATE_CUSTOMER_SUCCESS':
            return {
                loadingCustomerList: state.loadingCustomerList,
                customerList: state.customerList,
                customerSelected: state.customerSelected,
                reloadCustomers: true,
                customerAlert: {
                    'toastId': action.toastId,
                    'alertType': 'success',
                    'alertMessage': 'Update Successful'
                },
            }
        case 'UPDATE_CUSTOMER_FAIL':
            return {
                loadingCustomerList: state.loadingCustomerList,
                customerList: state.customerList,
                customerSelected: state.customerSelected,
                reloadCustomers: false,
                customerAlert: {
                    'toastId': action.toastId,
                    'alertType': 'error',
                    'alertMessage': 'Update Failed! Please try again'
                },
            }
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};