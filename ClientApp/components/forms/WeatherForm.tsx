import * as React from 'react';
import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { Form, FormGroup } from 'reactstrap';
import { weatherTypeList1 } from '../../helpers/_weatherTypeList'
import * as moment from 'moment';
import { Button, Card, CardImage, CardBody, CardTitle, CardText, Fa } from 'mdbreact'

// generate option element from employeeType
function weatherOption(et) {
    return <option key={et.weatherTypeId} value={et.weatherTypeId}>{et.weatherType}</option>
}

// generate option element from usaStatesList
function weatherTypeOption(ww) {
    return <option key={ww.shortName} value={ww.shortName}>{ww.name}</option>
}

let WeatherForm = props => {

    const { handleSubmit, pristine, reset, submitting } = props;

    const wtl =
        (typeof props.props !== 'undefined' &&
            typeof props.props.weatherTypeList !== 'undefined' ?
            props.props.weatherTypeList : []);

    if (typeof props.initialValues !== 'undefined' &&
        typeof props.initialValues.date !== 'undefined' &&
        props.initialValues.date != null) {
        const dateString = props.initialValues.date;
        props.initialValues.date = moment(dateString).format('YYYY-MM-DD')
    }

    return <div>
        <form onSubmit={handleSubmit}>
            <label>Date</label>
            <Field
                name="date"
                component="input"
                type="date"
            />
            <label>Weather Type</label>
            <Field
                name="weatherType"
                component="select"
            >
                <option value='' disabled>Select Type</option>
                {...wtl.map(weatherTypeOption)}
            </Field>

            <button type="submit" disabled={pristine || submitting}>
                Submit
		</button>
            <button type="button" disabled={pristine || submitting} onClick={reset}>
                Reset
		</button>
        </form>
    </div>;
}

WeatherForm = reduxForm({
})(WeatherForm);

export default WeatherForm;