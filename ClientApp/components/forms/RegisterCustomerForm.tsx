import * as React from 'react';

import { Field, reduxForm, formValueSelector } from 'redux-form';
import { usaStatesList } from '../../helpers/_usaStatesList'

// generate option element from usaStatesList
function usaStatesOption(st) {
    return <option key={st.shortName} value={st.shortName}>{st.name}</option>
}

// format dateString so it shows as initial value 
// YYYY-MM-dd
function formatDate(dateString) {
    var d = new Date(dateString),
        month = '' + (d.getMonth()+1),
        day = '' + (d.getDate()),
        year = '' + d.getFullYear();

    if (month.length<2) month = '0' + month;
    if (day.length<2) day = '0' + day;

    return [year,month,day].join('-');
}

let RegisterCustomerForm = props => {
    const { handleSubmit, reset, submitting } = props;

     // assigns usaStatesList
    const stl = usaStatesList;

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
                type="email" 
            />
            <label>Date of Birth</label>
            <Field 
                name="dateOfBirth" 
                component="input" 
                type="date" 
            />
            <label>Gender</label>
            <Field 
                name="gender" 
                component="input" 
                type="text" 
            />
            <label>Emergency Contact Number</label>
            <Field 
                name="emergencyContactNumber" 
                component="input" 
                type="text" 
            />
            <label>Street Address</label>
            <Field 
                name="addressStreet" 
                component="input" 
                type="text" 
            />
            <label>City</label>
            <Field 
                name="addressCity" 
                component="input" 
                type="text" 
            />
             <label>State</label>
            <Field 
                name="addressState" 
                component="select" 
            >
            <option value='' disabled>Select State</option>
            {...stl.map(usaStatesOption)}
            </Field>
            <label>Zip Code</label>
            <Field 
                name="addressZipCode" 
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