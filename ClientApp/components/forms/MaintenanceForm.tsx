import * as React from 'react';
import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { Button, Form, FormGroup } from 'reactstrap';

import * as moment from 'moment';

// generate option element from maintenance employees
function maintEmployeeOption(me) {
    return <option key={me.employeeId} 
        value={me.employeeId}>{me.empFirstName + ' ' + me.empLastName}
    </option>
}

// generate option element from rides
function rideOption(r) {
    return <option key={r.rideId} 
        value={r.rideId}>{r.rideName}
    </option>
}


let MaintenanceForm = props => {
    const { handleSubmit, pristine, reset, submitting } = props;

    // format dates for datepicker
    if (typeof props.initialValues !== 'undefined' &&
            typeof props.initialValues.startDate !== 'undefined' &&
            props.initialValues.startDate != null) {
        const dateString = props.initialValues.startDate;
        props.initialValues.startDate = moment(dateString).format('YYYY-MM-DD')
    }
    if (typeof props.initialValues !== 'undefined' &&
            typeof props.initialValues.endDate !== 'undefined' &&
            props.initialValues.endDate != null) {
        const dateString = props.initialValues.endDate;
        props.initialValues.endDate = moment(dateString).format('YYYY-MM-DD')
    }

    // assigns maintenanceEmployeeList if they are loaded
    const mel =
        (typeof props.props !== 'undefined' &&
            typeof props.props.maintenanceEmployeeList !== 'undefined' ?
            props.props.maintenanceEmployeeList : []);

    // assigns rideList if they are loaded
    const rl =
        (typeof props.props !== 'undefined' &&
            typeof props.props.rideList !== 'undefined' ?
            props.props.rideList : []);

    return <div>
        <Form onSubmit={handleSubmit}>
            <FormGroup className="row">
                <label>Start Date</label>
                <Field 
                    name="startDate" 
                    component="input" 
                    type="date" 
                />
            {typeof props.initialValues !== 'undefined' && 
                (typeof props.initialValues.endDate !== 'undefined' && props.initialValues.endDate!= null) ?
                (<div><label>
                    End Date</label>
                <Field 
                    name="endDate" 
                    component="input" 
                    type="date" 
                /></div>) : ''
            }
            </FormGroup>

            <FormGroup className="row">
                <label>Maintenance Type</label>
                <Field 
                    name="mainType" 
                    component="select"
                >
                <option value='' disabled>Select Type</option>
                <option value='r'>Repair</option>
                <option value='c'>Cleaning</option> 
                </Field>
                <label>RideId</label>
                <Field 
                    name="rideId" 
                    component="select"
                >
                    <option value='' disabled>Select Ride</option>
                    {...rl.map(rideOption)}
                </Field>
            </FormGroup>
            <FormGroup className="row">
                <label>Manager EmployeeId</label>
                <Field 
                    name="managerEmployeeId" 
                    component="select" 
                >
                    <option value='' disabled>Select Employee</option>
                    {...mel.map(maintEmployeeOption)}
                </Field>
            </FormGroup>

            <FormGroup className="row">
                <label>Description</label>
                <Field 
                    name="description" 
                    component="textarea" 
                    type="text" 
                />
            </FormGroup>

            <FormGroup className="row">
        		<Button color="primary" type="submit" disabled={pristine || submitting}>
        			Submit
        		</Button>
        		<Button disabled={pristine || submitting} onClick={reset}>
        			Reset
        		</Button>
            </FormGroup>
	    </Form>
    </div>;
}

MaintenanceForm = reduxForm({
})(MaintenanceForm);

export default MaintenanceForm;