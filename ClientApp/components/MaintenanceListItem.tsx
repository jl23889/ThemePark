import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState, AppThunkAction }  from '../store';

import * as MaintenanceActions from '../actions/_MaintenanceActions';
import { requestEmployee } from '../actions/_EmployeeActions';
import { requestRide } from '../actions/_RideActions';
import { Employee, Maintenance, Ride } from '../models/_DataModels'

import MaintenanceForm from './forms/MaintenanceForm';

import { ListGroupItem } from 'react-bootstrap';
import { Button } from 'reactstrap';
import { toast } from 'react-toastify';
import { displayToast } from '../helpers/_displayToast'

import * as moment from 'moment';

interface ListItemProps {
    maintenance: Maintenance;
    updateMaintenance: (values, toastId) => AppThunkAction<MaintenanceActions.MaintenanceActions>;    
} 

interface ListItemState {
    maintenance: Maintenance,
    ride: Ride,
    employee: Employee
}

export class MaintenanceListItem extends React.Component<ListItemProps,ListItemState> {
    constructor(props){
        super(props);

        this.state = {
            maintenance: this.props.maintenance,
            ride: null,
            employee: null,
        }
    }

    componentDidMount() {
        requestRide(this.props.maintenance.rideId)
            .then(response=>{
                this.setState({ride: response.data})
            });
        requestEmployee(this.props.maintenance.managerEmployeeId)
            .then(response=>{
                this.setState({employee: response.data})
            });
    }

    markComplete = () => {
        this.props.maintenance.endDate = new Date();
        this.props.updateMaintenance(this.props.maintenance, null);
    }

    render() {
        return <ListGroupItem
            key={'listGroupItem'+this.props.maintenance.maintenanceId}
            bsStyle={this.props.maintenance.endDate!=null ? 'info' : 
                moment(this.props.maintenance.startDate)<=moment() ? 'success' : 'warning'}>
            <div className="row">
                <div className="col-md-4">
                    Start Date: {this.props.maintenance.startDate}
                    <br/>
                    {this.props.maintenance.endDate!=null 
                        ? 'End Date: ' + this.props.maintenance.endDate 
                        : ''}
                </div>
                <div className="col-md-4">
                    {this.state.ride!=null 
                        ? 'Ride: ' + this.state.ride.rideName 
                        : ''}
                    <br/>
                    {this.state.employee!=null 
                        ? 'Managing Employee: ' + this.state.employee.empFirstName + ' '
                            + this.state.employee.empLastName 
                        : ''}
                </div>
                <div className="col-md-4">
                    <div className="pull-right">
                        <Button key={'listItemEditButton'+this.props.maintenance.maintenanceId}
                        >
                            Edit
                        </Button>
                        { this.props.maintenance.endDate!=null || moment(this.props.maintenance.startDate)>=moment() ? ''
                            : <Button 
                                key={'listItemButton'+this.props.maintenance.maintenanceId}
                                onClick={this.markComplete}
                            >
                                Mark as Complete
                            </Button>
                        }
                    </div>
                </div>
            </div>            
        </ListGroupItem>
    }
}