import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState, AppThunkAction }  from '../store';

import * as MaintenanceActions from '../actions/_MaintenanceActions';
import { requestEmployee, requestEmployees } from '../actions/_EmployeeActions';
import { requestRide, 
    assignRideEmployees,
    assignRideManagers,
    removeAllRideEmployees,
    removeAllRideManagers } from '../actions/_RideActions';

import { Alert, Ride, Employee } from '../models/_DataModels'

import { Image } from 'react-bootstrap';
import { Button, ListGroupItem, ListGroupItemHeading } from 'reactstrap';
import { toast } from 'react-toastify';
import { displayToast } from '../helpers/_displayToast'

import Select from 'react-select';

import * as moment from 'moment';

interface ListItemProps {
    ride: Ride;
    rideList: Ride[];
    managerEmployeeList: Employee[];
    rideEmployeeList: Employee[];
} 

interface EmployeeSelect {
    employeeId: string;
    empFirstName: string;
    empLastName: string;
}

interface ListItemState {
    ride: Ride;

    employees: Employee[]; // this is what is currently stored in the database
    employeesToUpdate: Employee[]; // this is what user has currently selected
    employeeList: Employee[]; // this what is shown in select dropdown

    managers: Employee[]; // this is what is currently stored in the database
    managersToUpdate: Employee[]; // this is what user has currently selected
    managerList: Employee[]; // this what is shown in select dropdown

    alert: Alert;
}

export class RideEmployeeListItem extends React.Component<ListItemProps,ListItemState> {
    constructor(props){
        super(props);

        // make a copy of the maintenance prop so that we can mutate it in local state
        const ride = JSON.parse(JSON.stringify(this.props.ride))

        this.state = {
            ride: ride,

            employees: [],
            employeesToUpdate: [],
            employeeList: this.props.rideEmployeeList,

            managers: [],
            managersToUpdate: [],
            managerList: this.props.managerEmployeeList,

            alert: null,
        }
    }

    componentDidMount() {
        // get list of ride employees
        // loop through list and get ride employees for each id
        var employees = [];
        var employeeIds = [];
        this.state.ride.rideEmployeeWorksAt
        .forEach(element => {
            employeeIds.push(element.employeeId);
        });
        // set state of employees
        requestEmployees(employeeIds)
        .then(response=>{
            this.setState({
                employees: response.data,
                employeesToUpdate: response.data,
            })
        }) 

        // get list of manager employees
        // loop through list and get manager employees for each id
        var managers = [];
        var managerIds = [];
        this.state.ride.rideEmployeeManages
        .forEach(element => {
            managerIds.push(element.employeeId);
        });
        // set state of managers
        requestEmployees(managerIds)
        .then(response=>{
            this.setState({
                managers: response.data,
                managersToUpdate: response.data,
            })
        }) 

        //TODO: Update employeelist and managerlist based on who's available 
    }

    componentDidUpdate() {
        //TODO: Update employeelist and managerlist based on who's available 

        // update unique toast 
        displayToast(this.state.alert );
    }

    render() {
        return <div>
            {this.renderView()}
        </div>
    }

    // formats employees for select form
    formatEmployeesSelect(employeeList) {
        // format employees for select
        var employeeSelect = [];
        if (employeeList.length >= 1) {
            employeeList.forEach(element => {
                employeeSelect.push({
                    value: element.employeeId,
                    label: element.empFirstName + ' ' + element.empLastName,
                })
            });
        }
        return employeeSelect;
    }

    // get selected manager employees and store in manager employees state
    handleChangeManager = (selectedOption) => {

        var managerIds = [];
        var managers = [];

        if (selectedOption.length >= 1) {
            // loop through list and get employees for each id
            selectedOption.forEach(element => {
                managerIds.push(element.value);
            });
            // request employees by array of employeeIds
            requestEmployees(managerIds)
            .then(response=>{
                this.setState({
                    managersToUpdate: response.data,
                })
            }) 
        } else {
            this.setState({
                managersToUpdate: [],
            })
        }
    }

    // get selected employees and store in employees state
    handleChangeEmployee = (selectedOption) => {

        var employeeIds = [];
        var employees = [];

        if (selectedOption.length >= 1) {
            // loop through list and get employees for each id
            selectedOption.forEach(element => {
                employeeIds.push(element.value);
            });
            // request employees by array of employeeIds
            requestEmployees(employeeIds)
            .then(response=>{
                this.setState({
                    employeesToUpdate: response.data,
                })
            }) 
        } else {
            this.setState({
                employeesToUpdate: [],
            })
        }
    }

    resetManagers = () => {
        this.setState({
            managersToUpdate: this.state.managers
        })
    }

    resetEmployees = () => {
        this.setState({
            employeesToUpdate: this.state.employees
        })
    }

    saveManagers = () => {
        // generate unique toast
        const toastId = 
            toast('Saving Managers...', {
                type: 'info'
            });

        // TODO: move this logic to controllers instead of deleting and creating 

        const re = {
            rideId: this.props.ride.rideId,
            employeeId: ''
        }
        // delete the original list of managers
        removeAllRideManagers(re)
        .then(response => {
            // insert the list of managers we're updating with
            var rideManagers = []
            this.state.managersToUpdate.forEach(element => {
                // create new rideEmployeeManages object
                const rideEmployee = {
                    rideId: this.props.ride.rideId,
                    employeeId: element.employeeId
                }

                rideManagers.push(rideEmployee);
            })
            // assign the objects to DB
            assignRideManagers(rideManagers, toastId)
            .then(response => {
                const toastId = 
                    toast('Updated Managers!', {
                        type: 'success'
                    })

                // reload managers state
                this.setState({
                    managers: this.state.managersToUpdate,

                })
            })
        })
    }

    saveEmployees = () => {
        // generate unique toast
        const toastId = 
            toast('Saving Employees...', {
                type: 'info'
            });

        // TODO: move this logic to controllers instead of deleting and creating 

        // delete the original list of employees
        const me = {
            rideId: this.props.ride.rideId,
            employeeId: ''
        }
        removeAllRideEmployees(me)
        .then(response => {
            var rideEmployees = [];
            // insert the list of employees we're updating with
            this.state.employeesToUpdate.forEach(element => {
                // create new rideEmployee object
                const rideEmployee = {
                    rideId: this.props.ride.rideId,
                    employeeId: element.employeeId
                }

                rideEmployees.push(rideEmployee);
            })
            // assign the objects to DB
            assignRideEmployees(rideEmployees, toastId)
            .then(response => {
                const toastId = 
                    toast('Updated Employees!', {
                        type: 'success'
                    })

                // reload employees state
                this.setState({
                    employees: this.state.employeesToUpdate,

                })
            })
        })
    }

    private renderView() {
        return <ListGroupItem
            key={'listGroupItem'+this.state.ride.rideId}
            tag='div'
            color={this.state.employees.length && this.state.managers.length 
                ? 'success' : 'warning'}>
            <ListGroupItemHeading>
                {this.state.ride.rideName}
            </ListGroupItemHeading>
            {this.state.employees.length && this.state.managers.length ? ''
                : <div className="row"><div className="col-md-12">
                NO EMPLOYEE OR MANAGER SELECTED
                </div></div> }
            <div className="row">
                <div className="col-md-6">
                    Managers:
                    <Select
                        name='form-field-name'
                        value={this.formatEmployeesSelect(this.state.managersToUpdate)}
                        onChange={this.handleChangeManager}
                        multi={true}
                        options={this.formatEmployeesSelect(this.state.managerList)}
                    />
                    <br/>
                    <Button key={'listItemSaveManagersButton'+this.props.ride.rideId}
                        color='primary'
                        onClick={this.saveManagers}
                    >Save Managers</Button>
                     <Button key={'listItemResetManagersButton'+this.props.ride.rideId}
                        onClick={this.resetManagers}
                    >Reset</Button>
                </div>
                <div className="col-md-6">
                    Employees:
                    <Select
                        name='form-field-name'
                        value={this.formatEmployeesSelect(this.state.employeesToUpdate)}
                        onChange={this.handleChangeEmployee}
                        multi={true}
                        options={this.formatEmployeesSelect(this.state.employeeList)}
                    />
                    <br/>
                    <Button key={'listItemSaveEmployeesButton'+this.props.ride.rideId}
                        color='primary'
                        onClick={this.saveEmployees}
                    >Save Employees</Button>
                     <Button key={'listItemResetEmployeesButton'+this.props.ride.rideId}
                        onClick={this.resetEmployees}
                    >Reset</Button>

                </div>
            </div>            
        </ListGroupItem>
    }
}


