import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState }  from '../store';
import * as RideStatusState from '../store/RideStatus';
import RideStatusForm from './RideStatusForm';

import ReactTable from 'react-table';
import { DropdownButton, MenuItem } from 'react-bootstrap'

// At runtime, Redux will merge together...
type DataProps =
    RideStatusState.RideStatusState        // ... state we've requested from the Redux store
    & typeof RideStatusState.actionCreators      // ... plus action creators we've requested
    & RouteComponentProps<{ entity: string }>; // ... plus incoming routing parameters

class RideStatus extends React.Component<DataProps, {}> {
    componentDidMount() {
        // This method runs when the component is first added to the page
        this.props.requestRideStatusList();
    }

    componentDidUpdate(nextProps: DataProps) {
        // This method runs when incoming props (e.g., route params) change
        this.props.requestRideStatusList();
    }

    render() {
        return <div>
            <h1>Ride Status Table</h1>
            { this.renderDropdown() }
            <h3>Create New</h3>
            { this.renderCreateNewForm() }
            { this.renderRideStatusTable() }
        </div>
    }

    createNewRideStatus = values => {
        this.props.createNewRideStatus(values);
    }

    updateRideStatus = values => {
        this.props.updateRideStatus(values);
    }

    deleteRideStatus(id) {
        this.props.deleteRideStatus(id);
    }

    private renderDropdown() {        
        return <DropdownButton
            bsStyle={'primary'}
            title={'Select Table'}
            id={`dropdown-basic`}
        >
            <MenuItem eventKey="1" active >RideStatus</MenuItem>
            <MenuItem eventKey="2" href="lookup/ridetype">RideType</MenuItem>
        </DropdownButton>
    }

    private renderCreateNewForm() {        
        return <RideStatusForm 
            onSubmit={this.createNewRideStatus}
            form="newForm"
        />
    }

    private renderRideStatusTable() {
        return <div>
            <ReactTable 
                data={this.props.rideStatusList}
                columns={[
                    {
                        Header: "RideStatusId",
                        accessor: "rideStatusId"
                    },
                    {
                        Header: "RideStatus",
                        accessor: "rideStatus",
                    }
                ]}
                className="-highlight"
                filterable
                SubComponent={row => {
                    const { original } = row;
                    // contains update form
                    return (
                    <div className="container">
                        <RideStatusForm 
                            onSubmit={this.updateRideStatus}
                            initialValues={original}
                            form={"form"+original.rideStatusId}
                        />
                        <button onClick={this.deleteRideStatus.bind(this, original) } >
                            Delete
                        </button>
                    </div>
                    );
                }}
            />
        </div>;
    }
}

export default connect(
    (state: ApplicationState) => state.rideStatus, // Selects which state properties are merged into the component's props
    RideStatusState.actionCreators                 // Selects which action creators are merged into the component's props
)(RideStatus) as typeof RideStatus;
