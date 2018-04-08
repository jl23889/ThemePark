import * as React from 'react';

import { Field, reduxForm } from 'redux-form';

let WeatherTypeForm = props => {
    const { handleSubmit, pristine, reset, submitting } = props;
    return <div>
        <form onSubmit={handleSubmit}>
            <label>WeatherType</label>
            <Field
                name="weatherType"
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

WeatherTypeForm = reduxForm({
})(WeatherTypeForm);

export default WeatherTypeForm;