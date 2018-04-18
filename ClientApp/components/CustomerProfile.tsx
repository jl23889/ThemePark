import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState }  from '../store';
import * as CustomerProfileState from '../store/CustomerProfile';
import * as CustomerActions from '../actions/_CustomerActions';
import * as Login from '../actions/_LoginActions';

import CustomerForm from './forms/CustomerForm';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { displayToast } from '../helpers/_displayToast'

// combines action creators from customer and customertype
const actionCreators = Object.assign(
    CustomerActions.actionCreators,
    Login.actionCreators);


// At runtime, Redux will merge together...
type DataProps =
    CustomerProfileState.CustomerProfileState        // ... state we've requested from the Redux store
    & typeof actionCreators    // ... plus action creators we've requested
    & RouteComponentProps<{}>; // ... plus incoming routing parameters

class CustomerProfile extends React.Component<DataProps, {}> {
    componentDidMount() {
        // This method runs when the component is first added to the page
        this.props.requestLoggedInCustomer();
    }

    componentDidUpdate(prevProps: DataProps) {
        // This method runs when incoming props (e.g., route params) change
        if (this.props.reloadCustomer) 
            this.props.requestLoggedInCustomer();

        // update unique toast 
        displayToast(this.props.customerAlert );
    }

    render() {
        return <div>
            <h3>Edit My Information</h3>
            { this.renderCustomerProfileForm() }
        </div>
    }

    updateCustomer = values => {
        // generate unique toast
        const toastId = 
            toast('Updating...', {
                type: 'info'
            });

        this.props.updateCustomer(values, toastId);
    }

    logoutUser = () => {
        this.props.logout();
        this.props.history.push('/login'); //redirect to login
    }

    private renderCustomerProfileForm() {        
        return <div>
            <CustomerForm 
                onSubmit={this.updateCustomer}
                initialValues={this.props.customer}
                form="customerProfileForm"
            />
            <Button bsStyle="warning"
                onClick={this.logoutUser}>Logout</Button>
        </div>
    }
}

export default connect(
    (state: ApplicationState) => state.customerProfile, // Selects which state properties are merged into the component's props
    actionCreators                 // Selects which action creators are merged into the component's props
)(CustomerProfile) as typeof CustomerProfile;