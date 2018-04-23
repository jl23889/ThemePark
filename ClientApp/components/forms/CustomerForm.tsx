import * as React from 'react';
import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { usaStatesList } from '../../helpers/_usaStatesList'

// generate option element from usaStatesList
function usaStatesOption(st) {
    return <option key={st.shortName} value={st.shortName}>{st.name}</option>
}

let CustomerForm = props => {
    const { handleSubmit, pristine, reset, submitting } = props;

    // assigns customerTypeList if it is loaded
    const etl =
        (typeof props.props !== 'undefined' &&
            typeof props.props.customerTypeList !== 'undefined' ?
            props.props.customerTypeList : []);

    // assigns usaStatesList
    const stl = usaStatesList;

    return <div>
        <form onSubmit={handleSubmit}>
            <label>First Name</label>
            <Field
                name="custFirstName"
                component="input"
                type="text"
            />
            <label>Last Name</label>
            <Field
                name="custLastName"
                component="input"
                type="text"
            />

            <label>Phone Number</label>
            <Field
                name="custPhoneNumber"
                component="input"
                type="text"
            />
            <label>Street Address</label>
            <Field
                name="custAddressStreet"
                component="input"
                type="text"
            />
            <label>City</label>
            <Field
                name="custAddressCity"
                component="input"
                type="text"
            />
            <label>State</label>
            <Field
                name="custAddressState"
                component="select"
            >
                <option value='' disabled>Select State</option>
                {...stl.map(usaStatesOption)}
            </Field>
            <label>Zip Code</label>
            <Field
                name="custAddressZipCode"
                component="input"
                type="text"
            />
            <label>Profile Picture (URL)</label>
            <Field
                name="custProfileImage"
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

CustomerForm = reduxForm({
})(CustomerForm);

export default CustomerForm;