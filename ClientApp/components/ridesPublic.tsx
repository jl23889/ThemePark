﻿import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as RidesState from '../store/Rides';
import * as RideActions from '../actions/_RideActions';
import * as RideStatusActions from '../actions/_RideStatusActions';
import * as RideTypeActions from '../actions/_RideTypeActions';
import * as EmployeeActions from '../actions/_EmployeeActions';
import * as moment from 'moment'

import RideForm from './forms/RideForm';
import { RideEmployeeListItem } from './RideEmployeeListItem';
import { RidesReport } from './RidesReport';

import { ListGroup, ListGroupItem } from 'react-bootstrap';
import {
    Button, Breadcrumb, BreadcrumbItem,
    Card, CardImage, CardBody, CardTitle, CardText, Fa
} from 'mdbreact'
import ReactTable from 'react-table';
import { toast } from 'react-toastify';
import { displayToast } from '../helpers/_displayToast'
import Select from 'react-select';

// combines action creators from ride, ridestatus, and ridetype
const actionCreators = Object.assign(
    RideActions.actionCreators,
    RideStatusActions.actionCreators,
    RideTypeActions.actionCreators,
    EmployeeActions.actionCreators);

// At runtime, Redux will merge together...
type DataProps =
    RidesState.RidesState        // ... state we've requested from the Redux store
    & typeof actionCreators    // ... plus action creators we've requested
    & RouteComponentProps<{ viewType: string }>; // ... plus incoming routing parameters

class Rides extends React.Component<DataProps, {}> {
    componentDidMount() {
        // This method runs when the component is first added to the page
        this.props.requestRideStatusList();
        this.props.requestRideTypeList();
        this.props.requestRidesList();
        this.props.requestManagerEmployees();
        this.props.requestRideEmployees();
    }

    componentDidUpdate(prevProps: DataProps) {
        // This method runs when incoming props (e.g., route params) change
        if (!this.props.loadingRideList && this.props.reloadRides)
            this.props.requestRidesList();

        // update unique toast 
        displayToast(this.props.rideAlert);
    }

    render() {
                return <div>
                    <div className="row justify-content-center">
                        <div className="col-8" >
                            <Card><CardBody>
                                <img className ="ridesbg" src= "https://www.highreshdwallpapers.com/wp-content/uploads/2014/03/Futuristic-Theme-Park-City.jpg" />
                                <CardTitle className="h5 text-center mb-5">
                                    Current Attractions</CardTitle>
                                {(!this.props.loadingRideList) ? this.renderRidesTable() :
                                    <h3>LOADING TABLE...</h3>}</CardBody></Card>
                        </div>
                    </div>
                </div>
    }

    // lookup ride status by id from rideStatusList prop
    private lookupRideStatus(id) {
        const rsl = this.props.rideStatusList;

        if (typeof rsl !== 'undefined' && rsl.length > 0) {
            for (var i = 0; i < rsl.length; i++) {
                if (id == rsl[i].rideStatusId) {
                    return rsl[i].rideStatus;
                }
            }
            return "Unknown";
        }
    }

    // generate select element from rideStatusList prop
    private lookupRideStatusFilter(filter, onChange) {
        const rsl = this.props.rideStatusList;

        if (typeof rsl !== 'undefined' && rsl.length > 0) {
            return <select
                onChange={event => onChange(event.target.value)}
                style={{ width: "100%" }}
                value={filter ? filter.value : "all"}
            >
                <option value="all">Show All</option>
                {rsl.map((rs, i) =>
                    <option value={rsl[i].rideStatusId}
                        key={i}>
                        {rsl[i].rideStatus}
                    </option>
                )}
            </select>
        }
    }

    // lookup ride type by id from rideStatusType prop
    private lookupRideType(id) {
        const rtl = this.props.rideTypeList;

        if (typeof rtl !== 'undefined' && rtl.length > 0) {
            for (var i = 0; i < rtl.length; i++) {
                if (id == rtl[i].rideTypeId) {
                    return rtl[i].rideType;
                }
            }
            return "Unknown";
        }
    }

    // generate select element from rideTypeList prop
    private lookupRideTypeFilter(filter, onChange) {
        const rtl = this.props.rideTypeList;

        if (typeof rtl !== 'undefined' && rtl.length > 0) {
            return <select
                onChange={event => onChange(event.target.value)}
                style={{ width: "100%" }}
                value={filter ? filter.value : "all"}
            >
                <option value="all">Show All</option>
                {rtl.map((rs, i) =>
                    <option value={rtl[i].rideTypeId}
                        key={i}>
                        {rtl[i].rideType}
                    </option>
                )}
            </select>
        }
    }
    private renderRidesTable() {
        return <div>
            <ReactTable
                data={this.props.rideList}
                columns={[
                    {
                        Header: "Ride Name",
                        accessor: "rideName"
                    },
                    {
                        Header: "Total Capacity",
                        accessor: "totalCapacity",
                        filterable: false
                    },
                    {
                        Header: "FastPassPossible",
                        accessor: "fastPassPossible",
                        Cell: row => (
                            row.value === false ? 'no'
                                : row.value === true ? 'yes'
                                    : 'Unknown'
                        ),
                        filterable: false
                    },
                    {
                        Header: "Ride Type",
                        accessor: "rideType",
                        Cell: row => (
                            this.lookupRideType(row.value)
                        ),
                        Filter: ({ filter, onChange }) =>
                            this.lookupRideTypeFilter(filter, onChange),
                        filterMethod: (filter, row) => {
                            if (filter.value == "all") {
                                return true;
                            }
                            return row.rideType == filter.value;
                        },
                    }
                ]}
            />
        </div>;
    }
}

export default connect(
    (state: ApplicationState) => state.rides, // Selects which state properties are merged into the component's props
    actionCreators                 // Selects which action creators are merged into the component's props
)(Rides) as typeof Rides;