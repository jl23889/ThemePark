import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as CustomersState from '../store/Customers';
import * as CustomerActions from '../actions/_CustomerActions';

import CustomerForm from './forms/CustomerForm';

import ReactTable from 'react-table';
import { toast } from 'react-toastify';
import { displayToast } from '../helpers/_displayToast'

// combines action creators from customer and customertype
const actionCreators = Object.assign(
    CustomerActions.actionCreators);

// At runtime, Redux will merge together...
type DataProps =
    CustomersState.CustomersState        // ... state we've requested from the Redux store
    & typeof actionCreators    // ... plus action creators we've requested
    & RouteComponentProps<{ entity: string }>; // ... plus incoming routing parameters

class Customers extends React.Component<DataProps, {}>{
    componentDidMount() {
        // This method runs when the component is first added to the page
        this.props.requestCustomersList();
    }

    componentDidUpdate(prevProps: DataProps) {
        // This method runs when incoming props (e.g., route params) change
        if (!this.props.loadingCustomerList && this.props.reloadCustomers) {
            this.props.requestCustomersList();
        }

        // update unique toast 
        displayToast(this.props.customerAlert);
    }

    render() {
        return <div>
            {this.props.updateCustomer}
        </div>
    }

    updateCustomer = values => {
        // generate unique toast
        const toastId =
            toast('Updating Customer...', {
                type: 'info'
            });
        this.props.updateCustomer(values, toastId);
    }
}

export default connect(
    (state: ApplicationState) => state.customers, // Selects which state properties are merged into the component's props
    actionCreators                 // Selects which action creators are merged into the component's props
);