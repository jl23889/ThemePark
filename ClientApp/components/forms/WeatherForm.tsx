import * as React from 'react';
import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { weatherTypeList1 } from '../../helpers/_weatherTypeList'

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

    // assigns usaStatesList
    const stl = weatherTypeList1;

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
                {...stl.map(weatherTypeOption)}
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