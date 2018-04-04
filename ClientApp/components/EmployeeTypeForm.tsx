import * as React from 'react';

import { Field, reduxForm } from 'redux-form';

let EmployeeTypeForm = props => {
    const { handleSubmit, pristine, reset, submitting } = props;
    return <div>
    	<form onSubmit={handleSubmit}>
    		<label>EmployeeType</label>
    		<Field 
    			name="employeeType" 
    			component="input" 
    			type="text" 
    		/>
    		<button type="submit" disabled={pristine || submitting}>
    			Submit
    		</button>
    		<button type="button" disabled={pristine || submitting} onClick={reset}>
    			Reset
    		</button>
    	</form>
    </div>;
}

EmployeeTypeForm = reduxForm({
})(EmployeeTypeForm);

export default EmployeeTypeForm;