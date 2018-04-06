import * as React from 'react';

import { Field, reduxForm } from 'redux-form';

let RegisterCustomerForm = props => {
    const { handleSubmit, reset, submitting } = props;
    return <div>
    	<form onSubmit={handleSubmit}>
            <label>First Name</label>
            <Field 
                name="firstName" 
                component="input" 
                type="text" 
            />
            <label>Last Name</label>
            <Field 
                name="lastName" 
                component="input" 
                type="text" 
            />
            <label>Email</label>
            <Field 
                name="email" 
                component="input" 
                type="text" 
            />
    		<label>Username</label>
    		<Field 
    			name="customerUserName" 
    			component="input" 
    			type="text" 
    		/>
    		<label>Password</label>
    		<Field 
    			name="customerPassword" 
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

RegisterCustomerForm = reduxForm({
})(RegisterCustomerForm);

export default RegisterCustomerForm;