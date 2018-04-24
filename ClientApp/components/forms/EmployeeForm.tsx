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
                <form onSubmit={handleSubmit} className="text-center mb-4">
                    <div>
                        <label>First Name</label>
                        <Field 
                            name="empFirstName" 
                            component="input" 
                            type="text" 
                        />
                        <label>Last Name</label>
                        <Field 
                            name="empLastName" 
                            component="input" 
                            type="text" 
                        />
                    </div>
                    <div>
                        <label>Employee Type</label>
                        <Field 
                            name="empType" 
                            component="select"
                        >
                        <option value='' disabled>Select Type</option>
                        {...etl.map(employeeTypeOption)}
                        </Field>
                        <label>Phone Number</label>
                        <Field 
                            name="empPhoneNumber" 
                            component="input" 
                            type="text" 
                        />
                    </div>
                    <div>
                        <label>Street Address</label>
                        <Field 
                            name="empAddressStreet" 
                            component="input" 
                            type="text" 
                        />
                        <label>City</label>
                        <Field 
                            name="empAddressCity" 
                            component="input" 
                            type="text" 
                        />
                    </div>
                    <div>
                        <label>State</label>
                        <Field 
                            name="empAddressState" 
                            component="select" 
                        >
                        <option value='' disabled>Select State</option>
                        {...stl.map(usaStatesOption)}
                        </Field>
                        <label>Zip Code</label>
                        <Field 
                            name="empAddressZipCode" 
                            component="input" 
                            type="text" 
                        />
                    </div>
                    <div>
                        <label>Profile Picture (URL)</label>
                        <Field 
                            name="empProfileImage" 
                            component="input" 
                            type="text" 
                        />
                    </div>
                    <div>
                        { profileImage != '' ? 
                            <div>
                                <h3>Current Picture</h3>
                                <img src={profileImage} alt="ProfileImage" width="200"/>
                            </div> : <div></div>
                        }
                    </div>
                    <div>
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