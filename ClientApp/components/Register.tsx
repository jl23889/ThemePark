import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState }  from '../store';
import * as RegisterState from '../store/Register';
import * as RegisterActions from '../actions/_RegisterActions'
import RegisterCustomerForm from './forms/RegisterCustomerForm';
import RegisterEmployeeForm from './forms/RegisterEmployeeForm';

import { Button } from 'react-bootstrap'
import { toast } from 'react-toastify';
import { displayToast } from '../helpers/_displayToast'


// At runtime, Redux will merge together...
type DataProps =
    RegisterState.RegisterState		// ... state we've requested from the Redux store
    & typeof RegisterActions.actionCreators       // ... plus action creators we've requested
    & RouteComponentProps<{}>; // ... plus incoming routing parameters

class Register extends React.Component<DataProps, {}> {
    componentDidMount() {
        // This method runs when the component is first added to the page
    }

    componentDidUpdate(prevProps: DataProps) {
        // This method runs when incoming props (e.g., route params) change
        // update unique toast 
        displayToast(this.props.registerAlert );
    }

    render() {
        return <div>
        	<h1>Registration Form</h1>
            <Button bsStyle="primary" 
                disabled={!this.props.disableCustomerForm} 
                onClick={this.props.showCustomerForm}>Customer</Button>
            <Button bsStyle="warning"
                disabled={!this.props.disableEmployeeForm} 
                onClick={this.props.showEmployeeForm}>Employee</Button>

            { !this.props.disableCustomerForm ? this.renderRegisterCustomerForm() : ''}
            { !this.props.disableEmployeeForm ? this.renderRegisterEmployeeForm() : ''}
        </div>
    }

    registerCustomer = values => {
        // generate unique toast
        const toastId = 
            toast('Registering New Customer...', {
                type: 'info',
                autoClose: 30000,
            });

        this.props.registerCustomer(values, toastId);
    }

    registerEmployee = values => {
        // generate unique toast
        const toastId = 
            toast('Registering New Employee...', {
                type: 'info',
                autoClose: 30000,
            });

        this.props.registerEmployee(values, toastId);
    }

    private renderRegisterCustomerForm() {
    	return <div>
            <h1>CUSTOMER REGISTRATION FORM</h1>
            <RegisterCustomerForm onSubmit={this.registerCustomer} form="registerCustomerForm"/>
        </div>
    }

    private renderRegisterEmployeeForm() {
        return <div>
            <h1>EMPLOYEE REGISTRATION FORM</h1>
            <RegisterEmployeeForm onSubmit={this.registerEmployee} form="registerEmployeeForm"/>
        </div>
    }
}

export default connect(
    (state: ApplicationState) => state.register, // Selects which state properties are merged into the component's props
    RegisterActions.actionCreators                 // Selects which action creators are merged into the component's props
)(Register) as typeof Register;