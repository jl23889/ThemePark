import * as React from 'react';
import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { usaStatesList } from '../../helpers/_usaStatesList'

import { Button, Card, CardImage, CardBody, CardTitle, CardText, Fa } from 'mdbreact'

// generate option element from employeeType
function employeeTypeOption(et) {
    return <option key={et.employeeTypeId} value={et.employeeTypeId}>{et.employeeType}</option>
}

// generate option element from usaStatesList
function usaStatesOption(st) {
    return <option key={st.shortName} value={st.shortName}>{st.name}</option>
}

let EmployeeForm = props => {

    const { handleSubmit, pristine, reset, submitting } = props;

    // assigns employeeTypeList if it is loaded
    const etl =
        (typeof props.props !== 'undefined' &&
            typeof props.props.employeeTypeList !== 'undefined' ?
            props.props.employeeTypeList : []);

    // assigns usaStatesList
    const stl = usaStatesList;

    // assigns profileImage if loaded
    const profileImage = 
        (props.initialValues != null && 
            props.initialValues.empProfileImage != null ?
            props.initialValues.empProfileImage : '')  

    return <Card>
            <CardBody>
            <CardTitle className="h5 text-center mb-5">Employee Information</CardTitle>
                <form onSubmit={handleSubmit} className="mb-4">
                    <div className="row">
                        <div className="col-4 text-right">
                            <label>First Name</label>
                        </div>
                        <div className="col-8">
                            <Field 
                                name="empFirstName" 
                                component="input" 
                                type="text" 
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4 text-right">
                            <label>Last Name</label>
                        </div>
                        <div className="col-8">
                            <Field 
                                name="empLastName" 
                                component="input" 
                                type="text" 
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4 text-right">
                            <label>Employee Type</label>
                        </div>
                        <div className="col-8">
                            <Field 
                                name="empType" 
                                component="select"
                            >
                            <option value='' disabled>Select Type</option>
                            {...etl.map(employeeTypeOption)}
                            </Field>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4 text-right">
                            <label>Phone Number</label>
                        </div>
                        <div className="col-8">
                            <Field 
                                name="empPhoneNumber" 
                                component="input" 
                                type="text" 
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4 text-right">
                            <label>Street Address</label>
                        </div>
                        <div className="col-8">
                            <Field 
                                name="empAddressStreet" 
                                component="input" 
                                type="text" 
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4 text-right">
                            <label>City</label>
                        </div>
                        <div className="col-8">
                            <Field 
                                name="empAddressCity" 
                                component="input" 
                                type="text" 
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4 text-right">
                            <label>State</label>
                        </div>
                        <div className="col-8">
                            <Field 
                                name="empAddressState" 
                                component="select" 
                            >
                            <option value='' disabled>Select State</option>
                            {...stl.map(usaStatesOption)}
                            </Field>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4 text-right">
                            <label>Zip Code</label>
                        </div>
                        <div className="col-8">
                            <Field 
                                name="empAddressZipCode" 
                                component="input" 
                                type="text" 
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4 text-right">
                            <label>Profile Picture (URL)</label>
                        </div>
                        <div className="col-8">
                            <Field 
                                name="empProfileImage" 
                                component="input" 
                                type="text" 
                            />
                        </div>
                    </div>
                    <div className="row text-center">
                        { profileImage != '' ? 
                            <div>
                                <h3>Current Picture</h3>
                                <img src={profileImage} alt="ProfileImage" width="200"/>
                            </div> : <div></div>
                        }
                    </div>
                    <div className="row text-center">
                		<Button color="success" type="submit" disabled={pristine || submitting}>
                			Submit
                		</Button>
                		<Button type="button" disabled={pristine || submitting} onClick={reset}>
                			Reset
                		</Button>
                    </div>
    	        </form>
        </CardBody>
    </Card>;
}

EmployeeForm = reduxForm({
})(EmployeeForm);

export default EmployeeForm;