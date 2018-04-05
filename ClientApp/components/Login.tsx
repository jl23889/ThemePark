import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState }  from '../store';
import * as LoginState from '../store/Login';
import * as LoginActions from '../actions/_LoginActions'
import LoginCustomerForm from './forms/LoginCustomerForm';
import LoginEmployeeForm from './forms/LoginEmployeeForm';

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
            { !this.props.loggedIn ? <div>
                <Button bsStyle="primary" 
                    disabled={!this.props.disableCustomerForm} 
                    onClick={this.props.showCustomerForm}>Customer</Button>
                <Button bsStyle="warning"
                    disabled={!this.props.disableEmployeeForm} 
                    onClick={this.props.showEmployeeForm}>Employee</Button>
                </div>
            : ''}

            { this.props.loggedIn ?
                <Button bsStyle="warning"
                onClick={this.props.logout}>Logout</Button> : '' }

            { !this.props.loggedIn && !this.props.disableCustomerForm ? this.renderLoginCustomerForm() : ''}
            { !this.props.loggedIn && !this.props.disableEmployeeForm ? this.renderLoginEmployeeForm() : ''}
            { this.props.loggedIn ? this.renderWelcome() : ''}
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
            <h1> NO ACCOUNT? REGISTER HERE: </h1>
            <Link to="/register">Register</Link>
        </div>
    }

    private renderLoginEmployeeForm() {
        return <div>
            <h1> EMPLOYEE LOGIN FORM </h1>
            <LoginEmployeeForm onSubmit={this.loginEmployee} form="loginEmployeeForm"/>
            <h1> NO ACCOUNT? REGISTER HERE: </h1>
            <Link to="/register">Register</Link>
        </div>
    }

    private renderWelcome() {
        return <div>
            <h1> YOU ARE NOW LOGGED IN</h1>
        </div>
    }
}

export default connect(
    (state: ApplicationState) => state.login, // Selects which state properties are merged into the component's props
    LoginActions.actionCreators                 // Selects which action creators are merged into the component's props
)(Login) as typeof Login;