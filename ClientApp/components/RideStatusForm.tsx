import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState }  from '../store';
import * as RideStatusState from '../store/RideStatus';

import ReactTable from 'react-table';
import { Field, reduxForm } from 'redux-form';

let RideStatusForm = props => {
    const { handleSubmit, pristine, reset, submitting } = props;
    return <div>
    	<form onSubmit={handleSubmit}>
    		<label>RideStatusId</label>
    		<Field 
    			name="rideStatusId" 
    			component="input" 
    			type="text" 
    		/>
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
    form: 'rideStatus'
})(RideStatusForm);

export default RideStatusForm;