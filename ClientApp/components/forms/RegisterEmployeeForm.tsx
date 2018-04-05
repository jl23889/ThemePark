import * as React from 'react';

import { Field, reduxForm } from 'redux-form';

let RegisterEmployeeForm = props => {
    const { handleSubmit, reset, submitting } = props;
    return <div>
    	<form onSubmit={handleSubmit}>
    		<label>Username</label>
    		<Field 
    			name="employeeUserName" 
    			component="input" 
    			type="text" 
    		/>
    		<label>Password</label>
    		<Field 
    			name="employeePassword" 
    			component="input" 
    			type="text" 
    		/>
            <label>EmployeeID</label>
            <Field 
                name="employeeId" 
                component="input" 
                type="text" 
            />
    		<button type="submit" disabled={submitting}>
    			Submit
    		</button>
    		<button type="button" disabled={submitting} onClick={reset}>
    			Reset
    		</button>
    	</form>
    </div>;
}

RegisterEmployeeForm = reduxForm({
})(RegisterEmployeeForm);

export default RegisterEmployeeForm;