import * as React from 'react';
import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form';
import * as moment from 'moment'

import { Button, Card, CardImage, CardBody, CardTitle, CardText, Fa } from 'mdbreact'

// generate option element from rideStatus
// function rideStatusOption(rs) {
//     return <option key={rs.rideStatusId} value={rs.rideStatusId}>{rs.rideStatus}</option>
// }

// generate option element from rideType
function rideTypeOption(rt) {
    return <option key={rt.rideTypeId} value={rt.rideTypeId}>{rt.rideType}</option>
}

let RideForm = props => {
    // format date initial values
    if (typeof props.initialValues !== 'undefined' &&
            typeof props.initialValues.installationDate !== 'undefined') {
        const dateString = props.initialValues.installationDate;
        props.initialValues.installationDate = moment(dateString).format('YYYY-MM-DD')
    }

    const { handleSubmit, pristine, reset, submitting } = props;

    // assigns rideTypeList if they are loaded
    // const rsl =
    //     (typeof props.props !== 'undefined' &&
    //         typeof props.props.rideStatusList !== 'undefined' ?
    //         props.props.rideStatusList : []);
    const rtl =
        (typeof props.props !== 'undefined' &&
            typeof props.props.rideTypeList !== 'undefined' ?
            props.props.rideTypeList : []);

    return (
        <Card>
            <CardBody>
            <CardTitle className="h5 text-center mb-5">Ride Information</CardTitle>
                <form onSubmit={handleSubmit} className="mb-4">
                    <div className="row">
                        <div className="col-4 text-right">
                            <label>Name</label>
                        </div>
                        <div className="col-8">
                            <Field 
                                name="rideName" 
                                component="input" 
                                type="text" 
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4 text-right">
                            <label>Total Capacity</label>
                        </div>
                        <div className="col-8">
                            <Field 
                                name="totalCapacity" 
                                component="input" 
                                type="number" 
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4 text-right">
                		    <label>Installation Date</label>
                        </div>
                        <div className="col-8">
                    		<Field 
                    			name="installationDate" 
                    			component="input" 
                    			type="date" 
                    		/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4 text-right">
                            <label>FastPass Possible</label>
                        </div>
                        <div className="col-8">
                            <Field 
                                name="fastPassPossible" 
                                component="input" 
                                type="checkbox" 
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4 text-right">
                            <label>Ride Type</label>
                        </div>
                        <div className="col-8">
                            <Field 
                                name="rideType" 
                                component="select"
                            >
                                <option value='' disabled>Select Type</option>
                                {...rtl.map(rideTypeOption)}
                            </Field>
                        </div>
                    </div>
                    <div className="text-center">
                		<Button color="success" type="submit" disabled={pristine || submitting}>
                			Submit
                		</Button>
                		<Button type="button" disabled={pristine || submitting} onClick={reset}>
                			Reset
                		</Button>
                    </div>
	            </form>
            </CardBody>
        </Card>);
}

RideForm = reduxForm({
})(RideForm);

export default RideForm;