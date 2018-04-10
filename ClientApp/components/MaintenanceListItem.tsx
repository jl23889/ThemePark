import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState, AppThunkAction }  from '../store';

import * as MaintenanceActions from '../actions/_MaintenanceActions';
import { requestEmployee } from '../actions/_EmployeeActions';
import { requestRide } from '../actions/_RideActions';
import { requestMaintenance, updateMaintenance } from '../actions/_MaintenanceActions';
import { Alert, Ride, Employee, Maintenance,
    MaintenanceManagerEmployee, 
    MaintenanceEmployee, 
    MaintenanceRide } from '../models/_DataModels'

import MaintenanceForm from './forms/MaintenanceForm';

import { Image } from 'react-bootstrap';
import { Button, ListGroupItem, ListGroupItemHeading } from 'reactstrap';
import { toast } from 'react-toastify';
import { displayToast } from '../helpers/_displayToast'

import * as moment from 'moment';

interface ListItemProps {
    maintenance: Maintenance;
    rideList: Ride[];
    employeeList: Employee[];
} 

interface ListItemState {
    maintenance: Maintenance;
    ride: MaintenanceRide;
    employee: MaintenanceManagerEmployee;
    editMode: boolean;
    maintenanceAlert: Alert;
}

export class MaintenanceListItem extends React.Component<ListItemProps,ListItemState> {
    constructor(props){
        super(props);

        this.state = {
            maintenance: this.props.maintenance,
            ride: this.props.maintenance.ride,
            employee: this.props.maintenance.managerEmployee,
            editMode: false,
            maintenanceAlert: null
        }
    }

    componentDidMount() {
    }

    componentDidUpdate() {
        // update unique toast 
        displayToast(this.state.maintenanceAlert );
    }

    render() {
        return <div>
            { (this.state.editMode) ? 
                this.renderEdit() : 
                this.renderView()}
        </div>
    }

    // TODO: these update functions are awful and need refactoring
    // !!!

    markComplete = () => {
        // generate unique toast
        const toastId = 
            toast('Setting Maintenance As Completed...', {
                type: 'info'
            });

        var maint = this.state.maintenance
        maint.endDate = new Date();
        updateMaintenance(maint, toastId)
            .then(response=>{
                this.setState({
                    maintenance: response.data.maintenance,
                    maintenanceAlert: {
                    'toastId': toastId,
                    'alertType': 'success',
                    'alertMessage': 'Update Successful'
                },
                })
            })
            .catch(error=>{
                console.log (error);
                this.setState({
                    maintenanceAlert: {
                    'toastId': toastId,
                    'alertType': 'error',
                    'alertMessage': 'Update Failed! Please try again'
                },
                })
            })
    }

    markActive = () => {
        // generate unique toast
        const toastId = 
            toast('Setting Maintenance As Active...', {
                type: 'info'
            });

        var maint = this.state.maintenance
        maint.endDate = null;

        updateMaintenance(maint, toastId)
            .then(response=>{
                this.setState({
                    maintenance: response.data.maintenance,
                    maintenanceAlert: {
                    'toastId': toastId,
                    'alertType': 'success',
                    'alertMessage': 'Update Successful'
                },
                })
            })
            .catch(error=>{
                this.setState({
                    maintenanceAlert: {
                    'toastId': toastId,
                    'alertType': 'error',
                    'alertMessage': 'Update Failed! Please try again'
                },
                })
            })
    }

    updateMaintenance = values => {
        // generate unique toast
        const toastId = 
            toast('Updating Maintenance...', {
                type: 'info'
            });

        updateMaintenance(values, toastId)
            .then(response=>{
                // update rides and employees
                requestRide(response.data.maintenance.rideId)
                    .then(rideResponse=>{
                        requestEmployee(response.data.maintenance.managerEmployeeId)
                        .then(empResponse=>{
                            this.setState({
                                ride: rideResponse.data,
                                employee: empResponse.data,
                                maintenance: response.data.maintenance,
                                editMode: false,
                                maintenanceAlert: {
                                'toastId': toastId,
                                'alertType': 'success',
                                'alertMessage': 'Update Successful'
                                }
                            })
                        });
                    });
            })
            .catch(error=>{
                this.setState({
                    editMode: true,
                    maintenanceAlert: {
                    'toastId': toastId,
                    'alertType': 'error',
                    'alertMessage': 'Update Failed! Please try again'
                },
                })
            })
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
                    {this.state.maintenance.endDate!=null 
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
                        { this.state.maintenance.endDate==null ?
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


