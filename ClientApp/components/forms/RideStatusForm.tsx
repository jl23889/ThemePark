import * as React from 'react';

import { Field, reduxForm } from 'redux-form';

let RideStatusForm = props => {
    const { handleSubmit, pristine, reset, submitting } = props;
    return <div>
    	<form onSubmit={handleSubmit}>
    		<label>RideStatus</label>
    		<Field 
    			name="rideStatus" 
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

RideStatusForm = reduxForm({
})(RideStatusForm);

export default RideStatusForm;