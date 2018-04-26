import * as React from 'react';
import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form';

import { Button, Card, CardImage, CardBody, CardTitle, CardText, Fa } from 'mdbreact'


import * as moment from 'moment';

// generate option element from manager employees
function managerEmployeeOption(me) {
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

    // assigns managerEmployeeList if they are loaded
    const mel =
        (typeof props.props !== 'undefined' &&
            typeof props.props.managerEmployeeList !== 'undefined' ?
            props.props.managerEmployeeList : []);

    // assigns rideList if they are loaded
    const rl =
        (typeof props.props !== 'undefined' &&
            typeof props.props.rideList !== 'undefined' ?
            props.props.rideList : []);

    return <Card>
            <CardBody>
            <CardTitle className="h5 text-center mb-5">Maintenance Information</CardTitle>       
                <form onSubmit={handleSubmit} className="mb-4">
                    <div className="row">
                        <div className="col-4 text-right">
                            <label>Start Date</label>
                        </div>
                        <div className="col-8">
                            <Field 
                                name="startDate" 
                                component="input" 
                                type="date" 
                            />
                        </div>
                    </div>
                    {typeof props.initialValues !== 'undefined' && 
                        (typeof props.initialValues.endDate !== 'undefined' && props.initialValues.endDate!= null) ?
                        (<div className="row"><div className="col-4 text-right">
                            <label>
                            End Date</label>
                            </div>
                            <div className="col-8">
                            <Field 
                            name="endDate" 
                            component="input" 
                            type="date" 
                            />
                            </div>
                        </div>) : ''
                    }

                    <div className="row">
                        <div className="col-4 text-right">
                            <label>Maintenance Type</label>
                        </div>
                        <div className="col-8">
                            <Field 
                                name="mainType" 
                                component="select"
                            >
                            <option value='' disabled>Select Type</option>
                            <option value='r'>Repair</option>
                            <option value='c'>Cleaning</option> 
                            </Field>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4 text-right">
                            <label>RideId</label>
                        </div>
                        <div className="col-8">
                            <Field 
                                name="rideId" 
                                component="select"
                            >
                                <option value='' disabled>Select Ride</option>
                                {...rl.map(rideOption)}
                            </Field>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4 text-right">
                            <label>Manager Employee</label>
                        </div>
                        <div className="col-8">
                            <Field 
                                name="managerEmployeeId" 
                                component="select" 
                            >
                                <option value='' disabled>Select Employee</option>
                                {...mel.map(managerEmployeeOption)}
                            </Field>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-4 text-right">
                            <label>Description</label>
                        </div>
                        <div className="col-8">
                            <Field 
                                name="description" 
                                component="textarea" 
                                type="text" 
                            />
                        </div>
                    </div>

                    <div className="text-center">
                		<Button color="primary" type="submit" disabled={pristine || submitting}>
                			Submit
                		</Button>
                		<Button disabled={pristine || submitting} onClick={reset}>
                			Reset
                		</Button>
                    </div>
        	    </form>
        </CardBody>
    </Card>;
}

MaintenanceForm = reduxForm({
})(MaintenanceForm);

export default MaintenanceForm;