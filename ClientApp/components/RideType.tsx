import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState }  from '../store';
import * as RideTypeState from '../store/RideType';
import RideTypeForm from './RideTypeForm';

import ReactTable from 'react-table';
import { DropdownButton, MenuItem } from 'react-bootstrap'

// At runtime, Redux will merge together...
type DataProps =
    RideTypeState.RideTypeState        // ... state we've requested from the Redux store
    & typeof RideTypeState.actionCreators      // ... plus action creators we've requested
    & RouteComponentProps<{ entity: string }>; // ... plus incoming routing parameters

class RideType extends React.Component<DataProps, {}> {
    componentDidMount() {
        // This method runs when the component is first added to the page
        this.props.requestRideTypeList();
    }

    componentDidUpdate(nextProps: DataProps) {
        // This method runs when incoming props (e.g., route params) change
        this.props.requestRideTypeList();
    }

    render() {
        return <div>
            <h1>Ride Type Table</h1>
            { this.renderDropdown() }
            <h3>Create New</h3>
            { this.renderCreateNewForm() }
            { this.renderRideTypeTable() }
        </div>
    }

    createNewRideType = values => {
        this.props.createNewRideType(values);
    }

    updateRideType = values => {
        this.props.updateRideType(values);
    }

    deleteRideType(id) {
        this.props.deleteRideType(id);
    }

    private renderDropdown() {        
        return <DropdownButton
            bsStyle={'primary'}
            title={'Select Table'}
            id={`dropdown-basic`}
        >
            <MenuItem eventKey="1" active >RideType</MenuItem>
            <MenuItem eventKey="2" href="lookup/ridestatus">RideStatus</MenuItem>
        </DropdownButton>
    }

    private renderCreateNewForm() {        
        return <RideTypeForm 
            onSubmit={this.createNewRideType}
            form="newForm"
        />
    }

    private renderRideTypeTable() {
        return <div>
            <ReactTable 
                data={this.props.rideTypeList}
                columns={[
                    {
                        Header: "RideTypeId",
                        accessor: "rideTypeId"
                    },
                    {
                        Header: "RideType",
                        accessor: "rideType",
                    }
                ]}
                className="-highlight"
                filterable
                SubComponent={row => {
                    const { original } = row;
                    // contains update form
                    return (
                    <div className="container">
                        <RideTypeForm 
                            onSubmit={this.updateRideType}
                            initialValues={original}
                            form={"form"+original.rideTypeId}
                        />
                        <button onClick={this.deleteRideType.bind(this, original) } >
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
    (state: ApplicationState) => state.rideType, // Selects which state properties are merged into the component's props
    RideTypeState.actionCreators                 // Selects which action creators are merged into the component's props
)(RideType) as typeof RideType;