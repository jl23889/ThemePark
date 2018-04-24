import * as React from 'react';
import { Link } from 'react-router-dom';

import { Field, reduxForm, formValueSelector } from 'redux-form';
import { usaStatesList } from '../../helpers/_usaStatesList'
import { Button, Card, CardBody, CardTitle } from 'mdbreact'

// generate option element from usaStatesList
function usaStatesOption(st) {
    return <option key={st.shortName} value={st.shortName}>{st.name}</option>
}

// format dateString so it shows as initial value 
// YYYY-MM-dd
function formatDate(dateString) {
    var d = new Date(dateString),
        month = '' + (d.getMonth()+1),
        day = '' + (d.getDate()),
        year = '' + d.getFullYear();

    if (month.length<2) month = '0' + month;
    if (day.length<2) day = '0' + day;

    return [year,month,day].join('-');
}

let RegisterCustomerForm = props => {
    const { handleSubmit, reset, submitting } = props;

     // assigns usaStatesList
    const stl = usaStatesList;

    return <Card>
        <CardBody>
            <CardTitle className="h5 text-center mb-5">Customer Registration</CardTitle>
            <form onSubmit={handleSubmit} className="mb-4">
            <div className="row">
                <div className="col-6 text-right">
                    <label>First Name</label>
                </div>
                <div className="col-6">
                    <Field 
                        name="firstName" 
                        component="input" 
                        type="text" 
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-6 text-right">
                    <label>Last Name</label>
                </div>
                <div className="col-6">
                    <Field 
                        name="lastName" 
                        component="input" 
                        type="text" 
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-6 text-right">
                    <label>Email</label>
                </div>
                <div className="col-6">
                    <Field 
                        name="email" 
                        component="input" 
                        type="email" 
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-6 text-right">
                    <label>Date of Birth</label>
                </div>
                <div className="col-6">
                    <Field 
                        name="dateOfBirth" 
                        component="input" 
                        type="date" 
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-6 text-right">
                    <label>Emergency Contact Number</label>
                </div>
                <div className="col-6">
                    <Field 
                        name="emergencyContactNumber" 
                        component="input" 
                        type="text" 
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-6 text-right">
                    <label>Street Address</label>
                </div>
                <div className="col-6">
                    <Field 
                        name="addressStreet" 
                        component="input" 
                        type="text" 
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-6 text-right">
                    <label>City</label>
                </div>
                <div className="col-6">
                    <Field 
                        name="addressCity" 
                        component="input" 
                        type="text" 
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-6 text-right">
                    <label>State</label>
                </div>
                <div className="col-6">
                    <Field 
                        name="addressState" 
                        component="select" 
                    >
                    <option value='' disabled>Select State</option>
                    {...stl.map(usaStatesOption)}
                    </Field>
                </div>
            </div>
            <div className="row">
                <div className="col-6 text-right">
                    <label>Zip Code</label>
                </div>
                <div className="col-6">
                    <Field 
                        name="addressZipCode" 
                        component="input" 
                        type="text" 
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-6 text-right">
        		    <label>Username</label>
        		</div>
                <div className="col-6">
                    <Field 
            			name="customerUserName" 
            			component="input" 
            			type="text" 
            		/>
                </div>
            </div>
            <div className="row">
                <div className="col-6 text-right">
        		    <label>Password</label>
        		</div>
                <div className="col-6">
                    <Field 
            			name="customerPassword" 
            			component="input" 
            			type="text" 
            		/>
                </div>
            </div>
            <div className="row justify-content-center">
                <Button color="primary" type="submit" disabled={submitting}>
                    Submit
                </Button>
                <Button disabled={submitting} onClick={reset}>
                    Reset
                </Button>
            </div>
    	</form>
        <hr/>
        <p className="text-right mb-4">Go to <Link to="/login">Login page</Link>.</p>
     </CardBody>
    </Card>;
}

RegisterCustomerForm = reduxForm({
})(RegisterCustomerForm);

export default RegisterCustomerForm;