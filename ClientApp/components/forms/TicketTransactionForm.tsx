import * as React from 'react';

import { Field, reduxForm } from 'redux-form';
import { Button, Input } from 'mdbreact'

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
            <div>  		
                <label>Ticket Type</label>
        		<Field 
        			name="ticketType" 
        			component="select" 
                >     
                    {...ttl.map(ticketTypeOption)}
                </Field>  
            </div>
            <div>
                <label>Add FastPass (+$10)</label>
                <Field 
                    name="fastPass" 
                    component="Input" 
                    type="checkbox" 
                />
            </div>
            <div>
                <label>Number of Tickets</label>
                <Field 
                    name="ticketAmount" 
                    component="Input" 
                    type="number" 
                />
            </div>
            <br/>
            <div>
        		<button type="submit" disabled={submitting}>
        			Add Ticket To Purchase
        		</button>
            </div>
    	</form>
    </div>;
}

TicketTransactionForm = reduxForm({
})(TicketTransactionForm);

export default TicketTransactionForm;