import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState }  from '../store';
import * as LoginState from '../store/Login';
import * as LoginActions from '../actions/_LoginActions'
import LoginCustomerForm from './forms/LoginCustomerForm';
import LoginEmployeeForm from './forms/LoginEmployeeForm';

// notification toasts
import { toast } from 'react-toastify';
import { displayToast } from '../helpers/_displayToast'
import { Alert } from '../models/_DataModels'

import { Button } from 'reactstrap'
import { Card, CardImage, CardBody, CardTitle, CardText, Fa } from 'mdbreact'

// At runtime, Redux will merge together...
type DataProps =
    LoginState.LoginState		// ... state we've requested from the Redux store
    & typeof LoginActions.actionCreators       // ... plus action creators we've requested
    & RouteComponentProps<{}>; // ... plus incoming routing parameters

class Login extends React.Component<DataProps, {}> {
    componentDidMount() {
        // This method runs when the component is first added to the page
    }

    componentDidUpdate(prevProps: DataProps) {
        // This method runs when incoming props (e.g., route params) change

        // update unique toast 
        displayToast(this.props.loginAlert );
    }

    render() {
        return <div>
            { !this.props.loggedIn ? <div className="row justify-content-center">
                <Button color="primary" className="col-2"
                    disabled={!this.props.disableCustomerForm} 
                    onClick={this.props.showCustomerForm}>Customer</Button>
                <Button color="warning" className="col-2"
                    disabled={!this.props.disableEmployeeForm} 
                    onClick={this.props.showEmployeeForm}>Employee</Button> 
                </div>               
            : ''}

            <div className="row justify-content-center">
                { !this.props.loggedIn && !this.props.disableCustomerForm ? this.renderLoginCustomerForm() : ''}
                { !this.props.loggedIn && !this.props.disableEmployeeForm ? this.renderLoginEmployeeForm() : ''}
                { this.props.loggedIn && typeof this.props.accessLevel === 'undefined' ? this.renderCustomerWelcome() : '' }
                { this.props.loggedIn && this.props.accessLevel >= 2 ? this.renderEmployeeWelcome() : '' }
                { this.props.loggedIn && this.props.accessLevel == 1 ? this.renderAdminWelcome() : '' }
            </div>
        </div>;
    }

    loginCustomer = values => {
        // generate unique toast
        const toastId = 
            toast('Attempting Customer Login...', {
                type: 'info',
                autoClose: 30000,
            });

        this.props.loginCustomer(values.username, values.password, toastId);
    }

    loginEmployee = values => {
        // generate unique toast
        const toastId = 
            toast('Attempting Employee Login...', {
                type: 'info',
                autoClose: 30000,
            });
        this.props.loginEmployee(values.username, values.password, toastId);
    }

    logoutUser = () => {
        this.props.logout();
        this.props.history.push('/login'); //redirect to login
    }

    private renderLoginCustomerForm() {
    	return <div className='col-4'>
            <LoginCustomerForm onSubmit={this.loginCustomer} form="loginCustomerForm"/>
        </div>
    }

    private renderLoginEmployeeForm() {
        return <div className='col-4'>
            <LoginEmployeeForm onSubmit={this.loginEmployee} form="loginEmployeeForm"/>
        </div>
    }

    private renderCustomerWelcome() {
        return <div className='row justify-content-center'>
            <div className='col-4'>
                <Card>
                    <CardBody className="text-center">
                        <CardTitle className="h3 text-center mb-1">My Profile</CardTitle>
                        <hr/>
                        <Button outline color="success">
                            <Link to={ '/customerProfile' }>
                                Edit Profile
                            </Link>
                        </Button>
                        <Button color="warning" onClick={this.logoutUser}>Logout</Button>
                    </CardBody>
                </Card>
            </div>
            <div className='col-4'>
                <Card>
                    <CardBody className="text-center">
                        <CardTitle className="h3 text-center mb-1">Tickets</CardTitle>
                        <hr/>
                        <Button outline color="primary">
                            <Link to={ '/ticket/purchase' }>
                                Purchase Ticket
                            </Link>
                        </Button>
                    </CardBody>
                </Card>
            </div>
        </div>
    }

    private renderEmployeeWelcome() {
        return <div className='row justify-content-center'>
            <div className='col-4'>
                <Card>
                    <CardBody className="text-center">
                        <CardTitle className="h3 text-center mb-1">My Profile</CardTitle>
                        <hr/>
                        <Button outline color="success">
                            <Link to={ '/customerProfile' }>
                                Edit Profile
                            </Link>
                        </Button>
                        <Button color="warning" onClick={this.logoutUser}>Logout</Button>
                    </CardBody>
                </Card>
            </div>
            <div className='col-4'>
                <Card>
                    <CardBody className="text-center">
                        <CardTitle className="h3 text-center mb-1">Tickets</CardTitle>
                        <hr/>
                        <Button outline color="primary">
                            <Link to={ '/scanticket' }>
                                Scan Ticket
                            </Link>
                        </Button>
                    </CardBody>
                </Card>
            </div>
        </div>
    }

    private renderAdminWelcome() {
        return <div className='row justify-content-center'>
            <div className='col-3'>
                <Card>
                    <CardBody className="text-center">
                        <CardTitle className="h3 text-center mb-1">My Profile</CardTitle>
                        <hr/>
                        <Button outline color="success">
                            <Link to={ '/profile' }>
                                Edit Profile
                            </Link>
                        </Button>
                        <Button color="warning" onClick={this.logoutUser}>Logout</Button>
                    </CardBody>
                </Card>
            </div>
            <div className='col-3'>
                <Card>
                    <CardBody className="text-center">
                        <CardTitle className="h3 text-center mb-1">Rides</CardTitle>
                        <hr/>
                        <Button outline color="primary">
                            <Link to={ '/scanticket' }>
                                Scan Ticket
                            </Link>
                        </Button>
                        <Button outline color="primary">
                            <Link to={ '/rides/table' }>
                                Manage Rides
                            </Link>
                        </Button>
                        <Button outline color="primary">
                            <Link to={ '/maintenance' }>
                                Schedule Maintenance
                            </Link>
                        </Button>
                        <Button outline color="primary">
                            <Link to={ '/rides/report' }>
                                View Report
                            </Link>
                        </Button>
                    </CardBody>
                </Card>
            </div>
            <div className='col-3'>
                <Card>
                    <CardBody className="text-center">
                        <CardTitle className="h3 text-center mb-1">Employees</CardTitle>
                        <hr/>
                        <Button outline color="primary">
                            <Link to={ '/employees' }>
                                Manage Employees
                            </Link>
                        </Button>
                        <Button outline color="primary">
                            <Link to={ '/rides/employees' }>
                                Assign Employees To Rides
                            </Link>
                        </Button>
                    </CardBody>
                </Card>
            </div>
        </div>
    }
}

export default connect(
    (state: ApplicationState) => state.login, // Selects which state properties are merged into the component's props
    LoginActions.actionCreators                 // Selects which action creators are merged into the component's props
)(Login) as typeof Login;