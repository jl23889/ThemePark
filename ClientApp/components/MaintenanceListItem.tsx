import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState, AppThunkAction }  from '../store';

import * as MaintenanceActions from '../actions/_MaintenanceActions';
import { requestEmployee } from '../actions/_EmployeeActions';
import { requestRide } from '../actions/_RideActions';
import { requestMaintenance } from '../actions/_MaintenanceActions';
import { Employee, Maintenance, Ride } from '../models/_DataModels'

import MaintenanceForm from './forms/MaintenanceForm';

import { Image } from 'react-bootstrap';
import { Button, ListGroupItem, ListGroupItemHeading } from 'reactstrap';
import { toast } from 'react-toastify';

import * as moment from 'moment';

interface ListItemProps {
    maintenance: Maintenance;
    updateMaintenance: (values, toastId) => AppThunkAction<MaintenanceActions.MaintenanceActions>;
    rideList: Ride[];
    employeeList: Employee[];
} 

interface ListItemState {
    maintenance: Maintenance;
    ride: Ride;
    employee: Employee;
    editMode: boolean;
}

export class MaintenanceListItem extends React.Component<ListItemProps,ListItemState> {
    constructor(props){
        super(props);

        this.state = {
            maintenance: this.props.maintenance,
            ride: null,
            employee: null,
            editMode: false,
        }
    }

    componentDidMount() {
        requestRide(this.state.maintenance.rideId)
            .then(rideResponse=>{
                requestEmployee(this.state.maintenance.managerEmployeeId)
                .then(empResponse=>{
                    this.setState({
                        ride: rideResponse.data,
                        employee: empResponse.data,
                    })
                });
            });
    }

    render() {
        return <div>
            { (this.state.editMode) ? 
                this.renderEdit() : 
                this.renderView()}
        </div>
    }

    markComplete = () => {
        // generate unique toast
        const toastId = 
            toast('Setting Maintenance As Completed...', {
                type: 'info'
            });

        this.state.maintenance.endDate = new Date();
        this.props.updateMaintenance(this.state.maintenance, toastId);
    }

    markActive = () => {
        // generate unique toast
        const toastId = 
            toast('Setting Maintenance As Active...', {
                type: 'info'
            });

        this.state.maintenance.endDate = null;
        this.props.updateMaintenance(this.state.maintenance, toastId);
    }

    updateMaintenance = values => {
        // generate unique toast
        const toastId = 
            toast('Updating Maintenance...', {
                type: 'info'
            });

        this.props.updateMaintenance(values, toastId);

        // update this component state with updated values
        // nest the network requests so that rerendering occurs
        requestRide(values.rideId)
            .then(rideResponse=>{
                requestEmployee(values.managerEmployeeId)
                .then(empResponse=>{
                    this.setState({
                        maintenance: values,
                        ride: rideResponse.data,
                        employee: empResponse.data,
                        editMode: false
                    })
                });
            });
    }

    toggleEdit = () => {
        this.setState({
            editMode: !this.state.editMode
        })
    }

    private renderView() {
        return <ListGroupItem
            key={'listGroupItem'+this.state.maintenance.maintenanceId}
            tag='div'
            color={this.state.maintenance.endDate!=null ? 'info' : 
                moment(this.state.maintenance.startDate)<=moment() ? 'success' : 'warning'}>
            <ListGroupItemHeading>{this.state.maintenance.endDate!=null ? 'Completed' : 
                moment(this.state.maintenance.startDate)<=moment() ? 'In Progress' : 'Scheduled'}
            </ListGroupItemHeading>
            <div className="row">
                <div className="col-md-4">
                    {this.state.ride!=null 
                        ? 'Ride: ' + this.state.ride.rideName 
                        : ''}
                    <br/>
                    {this.state.employee!=null 
                        ? 'Managing Employee: ' + this.state.employee.empFirstName + ' '
                            + this.state.employee.empLastName
                        : ''}
                    <Image src={this.state.employee!=null ? this.state.employee.empProfileImage : ''} responsive/>
                </div>
                <div className="col-md-4">
                    Start Date: {moment(this.state.maintenance.startDate).format('MM-DD-YYYY')}
                    <br/>
                    {this.props.maintenance.endDate!=null 
                        ? 'End Date: ' + moment(this.state.maintenance.endDate).format('MM-DD-YYYY') 
                        : ''}
                </div>
                <div className="col-md-4">
                    <div className="pull-right">
                        <Button 
                            key={'listItemEditButton'+this.props.maintenance.maintenanceId}
                            onClick={this.toggleEdit}
                        >
                            Edit
                        </Button>
                        { this.props.maintenance.endDate==null ?
                            ( moment(this.state.maintenance.startDate)<=moment() ?
                                <Button 
                                    key={'listItemCompleteButton'+this.props.maintenance.maintenanceId}
                                    onClick={this.markComplete}
                                >
                                    Mark as Complete
                                </Button> : '')
                                : <Button 
                                    key={'listItemActiveButton'+this.props.maintenance.maintenanceId}
                                    onClick={this.markActive}
                                >
                                    Mark as Active
                                </Button>
                        }
                    </div>
                </div>
            </div>            
        </ListGroupItem>
    }

    private renderEdit() {
        return <ListGroupItem
            key={'listGroupItem'+this.props.maintenance.maintenanceId}
            tag='div'>
            <ListGroupItemHeading>Editing</ListGroupItemHeading>
            <div className="row">
                <div className="col-md-8">
                    <MaintenanceForm 
                        onSubmit={this.updateMaintenance}
                        form="updateMaintForm"
                        initialValues={this.state.maintenance}
                        props={{
                            rideList: this.props.rideList,
                            maintenanceEmployeeList: this.props.employeeList,
                        }}
                    />
                </div>
                <div className="col-md-4">
                    <div className="pull-right">
                        <Button 
                            key={'listItemEditButton'+this.props.maintenance.maintenanceId}
                            onClick={this.toggleEdit}
                            outline color='secondary'
                        >
                            Back
                        </Button>
                    </div>
                </div>
            </div>            
        </ListGroupItem>
    }
}


