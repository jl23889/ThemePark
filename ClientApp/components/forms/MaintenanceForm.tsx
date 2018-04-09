import * as React from 'react';
import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form';

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
        <form onSubmit={handleSubmit}>
        <label>Start Date</label>
        <Field 
            name="startDate" 
            component="input" 
            type="date" 
        />
        <label>Maintenance Type</label>
        <Field 
            name="mainType" 
            component="select"
        >
        <option value='' disabled>Select Type</option>
        <option value='r'>Repair</option>
        <option value='c'>Cleaning</option> 
        </Field>
        <label>Description</label>
        <Field 
            name="description" 
            component="textarea" 
            type="text" 
        />
        <label>RideId</label>
        <Field 
            name="rideId" 
            component="select"
        >
            <option value='' disabled>Select Ride</option>
            {...rl.map(rideOption)}
        </Field>
        <label>Manager EmployeeId</label>
        <Field 
            name="managerEmployeeId" 
            component="select" 
        >
            <option value='' disabled>Select Employee</option>
            {...mel.map(maintEmployeeOption)}
        </Field>

		<button type="submit" disabled={pristine || submitting}>
			Submit
		</button>
		<button type="button" disabled={pristine || submitting} onClick={reset}>
			Reset
		</button>
	</form>
    </div>;
}

MaintenanceForm = reduxForm({
})(MaintenanceForm);

export default MaintenanceForm;