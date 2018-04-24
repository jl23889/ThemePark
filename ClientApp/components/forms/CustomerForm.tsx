import * as React from 'react';
import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { usaStatesList } from '../../helpers/_usaStatesList'

import { Button, Card, CardImage, CardBody, CardTitle, CardText, Fa } from 'mdbreact'

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

    return <Card>
            <CardBody>
            <CardTitle className="h5 text-center mb-5">Customer Information</CardTitle>
                <form onSubmit={handleSubmit} className="text-center mb-4">
                    <div>
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
                    </div>
                    <div>
                        <label>Emergency Contact Number</label>
                        <Field
                            name="emergencyContactNumber"
                            component="input"
                            type="text"
                        />
                    </div>
                    <div>
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
                    </div>
                    <div>
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
                    </div>
                    <div>
                        <Button color="success" type="submit" disabled={pristine || submitting}>
                            Submit
                		</Button>
                            <Button type="button" disabled={pristine || submitting} onClick={reset}>
                                Reset
                		</Button>
                    </div>
                </form>
            </CardBody>
    </Card>;
}

CustomerForm = reduxForm({
})(CustomerForm);

export default CustomerForm;