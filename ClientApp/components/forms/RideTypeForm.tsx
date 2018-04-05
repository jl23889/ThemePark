import * as React from 'react';

import { Field, reduxForm } from 'redux-form';

let RideTypeForm = props => {
    const { handleSubmit, pristine, reset, submitting } = props;
    return <div>
    	<form onSubmit={handleSubmit}>
    		<label>RideType</label>
    		<Field 
    			name="rideType" 
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

RideTypeForm = reduxForm({
})(RideTypeForm);

export default RideTypeForm;