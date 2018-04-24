import * as React from 'react';
import { Link } from 'react-router-dom';

import { Field, reduxForm } from 'redux-form';
import { Button, Card, CardBody, CardTitle } from 'mdbreact'

let LoginCustomerForm = props => {
    const { handleSubmit, reset, submitting } = props;
    return <Card>
        <CardBody>
            <CardTitle className="h5 text-center mb-5">Customer Login</CardTitle>
        	<form onSubmit={handleSubmit} className="text-center mb-4">
                <div>
            		<label>Username: </label>
            		<Field 
            			name="username" 
            			component="input" 
            			type="text" 
            		/>
                </div>
                <div>
            		<label>Password: </label>
            		<Field 
            			name="password" 
            			component="input" 
            			type="password" 
            		/>
                </div>
                <div>
            		<Button color="primary" type="submit" disabled={submitting}>
            			Submit
            		</Button>
            		<Button disabled={submitting} onClick={reset}>
            			Reset
            		</Button>
                </div>
        	</form>
            <hr/>
            <p className="text-right mb-4">No account? <Link to="/register">Register here</Link>.</p>
        </CardBody>
    </Card>;
}

LoginCustomerForm = reduxForm({
})(LoginCustomerForm);

export default LoginCustomerForm;