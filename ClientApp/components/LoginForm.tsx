import * as React from 'react';

import { Field, reduxForm } from 'redux-form';

let LoginForm = props => {
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

LoginForm = reduxForm({
})(LoginForm);

export default LoginForm;