import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';

import { Field, reduxForm, formValueSelector } from 'redux-form';

import { ApplicationState }  from '../store';
import { requestRides } from '../actions/_RideActions'
import * as TicketActions from '../actions/_TicketActions';
import * as TicketState from '../store/Ticket';
import { toast } from 'react-toastify';
import { displayToast } from '../helpers/_displayToast'


type TicketProps =
    TicketState.TicketState
    & typeof TicketActions.actionCreators
    & RouteComponentProps<{}>;

// generate option element from rides
function rideOption(r) {
    return <option key={r.rideId} 
        value={r.rideId}>{r.rideName}
    </option>
}

// ticket form type
let TicketForm = props => {
    const { handleSubmit, pristine, submitting } = props;

    // assigns employeeTypeList if it is loaded
    const rl =
        (typeof props.props !== 'undefined' &&
            typeof props.props.rideList !== 'undefined' ?
            props.props.rideList : []);

    return <div><form onSubmit={handleSubmit}>
        <label>TicketId</label>
        <Field 
            name="ticketId" 
            component="input" 
            type="text" 
        />
        <label>Ride</label>
        <Field 
            name="rideId" 
            component="select"
        >
            <option value='' disabled>Select Ride</option>
            {...rl.map(rideOption)}
        </Field>

        <button type="submit" disabled={pristine || submitting}>
            Submit
        </button>
    </form></div>;
}

TicketForm = reduxForm({
})(TicketForm);

class TicketScan extends React.Component<TicketProps, {}> {

    componentDidMount() {
        this.props.requestRideList();
    }

    componentDidUpdate() {
        // update unique toast 
        displayToast(this.props.alert );
    }

    scanTicket = (values) => {
        // generate unique toast
        const toastId = 
            toast('Scanning Ticket...', {
                type: 'info'
            });

        this.props.scanTicket(values, toastId)
    }

    render() {
        return <div>
            <h1>Scan Ticket</h1>

            <TicketForm
                onSubmit={this.scanTicket}
                form="newEmployeeForm"
                props={{
                    rideList: this.props.rideList
                }}/>
        </div>;
    }
}

// Wire up the React component to the Redux store
export default connect(
    (state: ApplicationState) => state.ticket, // Selects which state properties are merged into the component's props
    TicketActions.actionCreators                 // Selects which action creators are merged into the component's props
)(TicketScan) as typeof TicketScan;