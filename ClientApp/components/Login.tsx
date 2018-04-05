import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState }  from '../store';
import * as LoginState from '../store/Login';
import * as LoginActions from '../actions/_LoginActions'
import LoginCustomerForm from './LoginCustomerForm';
import LoginEmployeeForm from './LoginEmployeeForm';

import { Button } from 'react-bootstrap'

// At runtime, Redux will merge together...
type DataProps =
    LoginState.LoginState		// ... state we've requested from the Redux store
    & typeof LoginActions.actionCreators       // ... plus action creators we've requested
    & RouteComponentProps<{}>; // ... plus incoming routing parameters

class Login extends React.Component<DataProps, {}> {
    componentDidMount() {
        // This method runs when the component is first added to the page
    }

    componentDidUpdate(nextProps: DataProps) {
        // This method runs when incoming props (e.g., route params) change
    }

    render() {
        return <div>
            <h1>Login Form</h1>
            <Button bsStyle="primary" 
                disabled={!this.props.disableCustomerForm} 
                onClick={this.props.showCustomerForm}>Customer</Button>
            <Button bsStyle="warning"
                disabled={!this.props.disableEmployeeForm} 
                onClick={this.props.showEmployeeForm}>Employee</Button>

            <Button bsStyle="warning"
                onClick={this.props.logout}>Logout</Button>

            { !this.props.disableCustomerForm ? this.renderLoginCustomerForm() : ''}
            { !this.props.disableEmployeeForm ? this.renderLoginEmployeeForm() : ''}
        </div>
    }

    loginCustomer = values => {
        this.props.loginCustomer(values.username, values.password);
    }

    loginEmployee = values => {
        this.props.loginEmployee(values.username, values.password);
    }

    private renderLoginCustomerForm() {
    	return <div>
            <h1> CUSTOMER LOGIN FORM </h1>
            <LoginCustomerForm onSubmit={this.loginCustomer} form="loginCustomerForm"/>
        </div>
    }

    private renderLoginEmployeeForm() {
        return <div>
            <h1> EMPLOYEE LOGIN FORM </h1>
            <LoginEmployeeForm onSubmit={this.loginEmployee} form="loginEmployeeForm"/>
        </div>
    }
}

export default connect(
    (state: ApplicationState) => state.login, // Selects which state properties are merged into the component's props
    LoginActions.actionCreators                 // Selects which action creators are merged into the component's props
)(Login) as typeof Login;