import * as React from 'react';
import { Link } from 'react-router-dom';

import { Field, reduxForm } from 'redux-form';
import { Button, Card, CardBody, CardTitle } from 'mdbreact'

let RegisterEmployeeForm = props => {
    const { handleSubmit, reset, submitting } = props;
    return <Card>
        <CardBody>
            <CardTitle className="h5 text-center mb-5">Employee Registration</CardTitle>
            <form onSubmit={handleSubmit} className="text-center mb-4">
            <div>
        		<label>Username</label>
        		<Field 
        			name="employeeUserName" 
        			component="input" 
        			type="text" 
        		/>
            </div>
            <div>
        		<label>Password</label>
        		<Field 
        			name="employeePassword" 
        			component="input" 
        			type="text" 
        		/>
            </div>
            <div>
                <label>EmployeeID</label>
                <Field 
                    name="employeeId" 
                    component="input" 
                    type="text" 
                />
            </div>
    		<div>
                <Button color="warning" type="submit" disabled={submitting}>
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

RegisterEmployeeForm = reduxForm({
})(RegisterEmployeeForm);

export default RegisterEmployeeForm;