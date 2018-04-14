import * as React from 'react';

import { Field, reduxForm } from 'redux-form';

// generate option element from ticketType
function ticketTypeOption(tt) {
    return <option key={tt.ticketTypeId} 
        value={tt.ticketTypeId}>{tt.ticketType}: ${tt.ticketPrice}</option>
}

let TicketTransactionForm = props => {
    const { handleSubmit, reset, submitting } = props;

    // assigns ticketType if it is loaded
    const ttl =
        (typeof props.props !== 'undefined' &&
            typeof props.props.ticketTypeList !== 'undefined' ?
            props.props.ticketTypeList : []);

    return <div>
    	<form onSubmit={handleSubmit}>  		
            <label>Ticket Type</label>
    		<Field 
    			name="ticketType" 
    			component="select" 
            >     
                {...ttl.map(ticketTypeOption)}
            </Field>  
            <label>Add FastPass (+$10)</label>
            <Field 
                name="fastPass" 
                component="input" 
                type="checkbox" 
            />
            <label>Number of Tickets</label>
            <Field 
                name="ticketAmount" 
                component="input" 
                type="number" 
            />
    		<button type="submit" disabled={submitting}>
    			Add Ticket To Purchase
    		</button>
    	</form>
    </div>;
}

TicketTransactionForm = reduxForm({
})(TicketTransactionForm);

export default TicketTransactionForm;