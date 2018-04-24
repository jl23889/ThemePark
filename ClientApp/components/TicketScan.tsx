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

import { Button, Card, CardImage, CardBody, CardTitle, CardText, Fa } from 'mdbreact'


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

    return <Card>
        <CardBody>
            <CardTitle className="h5 text-center mb-5">Scan Ticket</CardTitle>
            <form onSubmit={handleSubmit} className="text-center mb-4">
                <div>
                    <label>TicketId</label>
                    <Field 
                        name="ticketId" 
                        component="input" 
                        type="text" 
                    />
                </div>
                <div>
                    <label>Ride</label>
                    <Field 
                        name="rideId" 
                        component="select"
                    >
                        <option value='' disabled>Select Ride</option>
                        {...rl.map(rideOption)}
                    </Field>

                </div>
                <div>
                    <Button color="success" type="submit" disabled={pristine || submitting}>
                        Submit
                    </Button>
                </div>
            </form>
        </CardBody>
    </Card>;
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
                type: 'info',
                autoClose: 30000,
            });

        this.props.scanTicket(values, toastId)
    }

    render() {
        return <div className="row justify-content-center">
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