import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState }  from '../store';
import * as EmployeeProfileState from '../store/EmployeeProfile';
import * as EmployeeActions from '../actions/_EmployeeActions';
import * as EmployeeTypeActions from '../actions/_EmployeeTypeActions';
import * as Login from '../actions/_LoginActions';

import EmployeeForm from './forms/EmployeeForm';
import { Button } from 'react-bootstrap';

// combines action creators from employee and employeetype
const actionCreators = Object.assign(
    EmployeeActions.actionCreators, 
    EmployeeTypeActions.actionCreators,
    Login.actionCreators);


// At runtime, Redux will merge together...
type DataProps =
    EmployeeProfileState.EmployeeProfileState        // ... state we've requested from the Redux store
    & typeof actionCreators    // ... plus action creators we've requested
    & RouteComponentProps<{}>; // ... plus incoming routing parameters

class EmployeeProfile extends React.Component<DataProps, {}> {
    componentDidMount() {
        // This method runs when the component is first added to the page
        this.props.requestEmployeeTypeList();
        this.props.requestLoggedInEmployee();
    }

    componentWillReceiveProps(nextProps: DataProps) {
        // This method runs when incoming props (e.g., route params) change
        if (this.props.reloadEmployee) 
            this.props.requestLoggedInEmployee();
    }

    render() {
        return <div>
            <h3>Edit My Information</h3>
            { this.renderProfileForm() }
        </div>
    }

    updateEmployee = values => {
        this.props.updateEmployee(values);
    }

    logoutUser = () => {
        this.props.logout();
        this.props.history.push('/login'); //redirect to login
    }

    private renderProfileForm() {        
        return <div>
            <EmployeeForm 
                onSubmit={this.updateEmployee}
                initialValues={this.props.employee}
                form="employeeProfileForm"
                props={{
                    employeeTypeList: this.props.employeeTypeList
                }}
            />
            <Button bsStyle="warning"
                onClick={this.logoutUser}>Logout</Button>
        </div>
    }
}

export default connect(
    (state: ApplicationState) => state.employeeProfile, // Selects which state properties are merged into the component's props
    actionCreators                 // Selects which action creators are merged into the component's props
)(EmployeeProfile) as typeof EmployeeProfile;