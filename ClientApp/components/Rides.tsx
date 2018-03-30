import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState }  from '../store';
import * as RidesState from '../store/Rides';

import ReactTable from 'react-table';
import { LocalForm, Control } from 'react-redux-form';

// At runtime, Redux will merge together...
type DataProps =
    RidesState.RidesState        // ... state we've requested from the Redux store
    & typeof RidesState.actionCreators      // ... plus action creators we've requested
    & RouteComponentProps<{ entity: string }>; // ... plus incoming routing parameters

class Rides extends React.Component<DataProps, {}> {
    componentDidMount() {
        // This method runs when the component is first added to the page
        this.props.requestRidesList();
    }

    componentWillReceiveProps(nextProps: DataProps) {
        // This method runs when incoming props (e.g., route params) change
        //this.props.requestRidesList();
    }

    public render() {
        return <div>
            <h1>Rides Table</h1>
            { this.renderRidesTable() }
        </div>
    }

    private renderRidesTable() {
        return <div>
            <ReactTable 
                data={this.props.ridesList}
                columns={[
                    {
                        Header: "RideId",
                        accessor: "rideId"
                    },
                    {
                        Header: "Ride Name",
                        accessor: "rideName"
                    },
                    {
                        Header: "Total Capacity",
                        accessor: "totalCapacity"
                    },
                    {
                        Header: "Installation Date",
                        accessor: "installationDate"
                    },
                    {
                        Header: "Status",
                        accessor: "status"
                    },
                    {
                        Header: "FastPassPossible",
                        accessor: "fastPassPossible"
                    },
                    {
                        Header: "Ride Type",
                        accessor: "rideType"
                    },
                    {
                        Header: "Date of Last Maintenance",
                        accessor: "lastMaintenanceSince"
                    }
                ]}
            />
        </div>;
    }
}

export default connect(
    (state: ApplicationState) => state.rides, // Selects which state properties are merged into the component's props
    RidesState.actionCreators                 // Selects which action creators are merged into the component's props
)(Rides) as typeof Rides;