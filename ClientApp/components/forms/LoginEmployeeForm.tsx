import * as React from 'react';

import { Field, reduxForm } from 'redux-form';

let LoginCustomerForm = props => {
    const { handleSubmit, reset, submitting } = props;
    return <div>
    	<form onSubmit={handleSubmit}>
    		<label>Username</label>
    		<Field 
    			name="username" 
    			component="input" 
    			type="text" 
    		/>
    		<label>Password</label>
    		<Field 
    			name="password" 
    			component="input" 
    			type="password" 
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

LoginCustomerForm = reduxForm({
})(LoginCustomerForm);

export default LoginCustomerForm;