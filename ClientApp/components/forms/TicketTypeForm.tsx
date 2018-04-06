import * as React from 'react';

import { Field, reduxForm } from 'redux-form';

let TicketTypeForm = props => {
    const { handleSubmit, pristine, reset, submitting } = props;
    return <div>
    	<form onSubmit={handleSubmit}>
    		<label>TicketType</label>
    		<Field 
    			name="ticketType" 
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

TicketTypeForm = reduxForm({
})(TicketTypeForm);

export default TicketTypeForm;