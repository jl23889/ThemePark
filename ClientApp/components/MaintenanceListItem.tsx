import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState, AppThunkAction }  from '../store';

import * as MaintenanceActions from '../actions/_MaintenanceActions';
import { requestEmployee, requestEmployees } from '../actions/_EmployeeActions';
import { requestRide } from '../actions/_RideActions';
import { assignMaintenanceEmployee, removeAllMaintenanceEmployees,
    requestMaintenance, 
    updateMaintenance } from '../actions/_MaintenanceActions';
import { Alert, Ride, Employee, Maintenance,
    MaintenanceManagerEmployee, 
    MaintenanceEmployee, 
    MaintenanceRide,
    MaintenanceEmployeeWorksAt } from '../models/_DataModels'

import MaintenanceForm from './forms/MaintenanceForm';

import { Image } from 'react-bootstrap';
import { Button, ListGroupItem, ListGroupItemHeading } from 'reactstrap';
import { toast } from 'react-toastify';
import { displayToast } from '../helpers/_displayToast'

import Select from 'react-select';

import * as moment from 'moment';

interface ListItemProps {
    maintenance: Maintenance;
    rideList: Ride[];
    managerEmployeeList: Employee[];
    maintenanceEmployeeList: Employee[];
} 

interface EmployeeSelect {
    employeeId: string;
    empFirstName: string;
    empLastName: string;
}

interface ListItemState {
    maintenance: Maintenance;
    ride: MaintenanceRide;
    employee: MaintenanceManagerEmployee;
    editMode: boolean;
    maintenanceAlert: Alert;
    employees: Employee[]; // this is what is currently stored in the database
    employeesToUpdate: Employee[]; // this is what user has currently selected
    maintenanceEmployeeList: Employee[]; // this what is shown in select dropdown
}

export class MaintenanceListItem extends React.Component<ListItemProps,ListItemState> {
    constructor(props){
        super(props);

        // make a copy of the employeeList prop so that we can mutate it in local state
        const maintenanceEmployeeList = JSON.parse(JSON.stringify(this.props.maintenanceEmployeeList))

        // make a copy of the maintenance prop so that we can mutate it in local state
        const maintenance = JSON.parse(JSON.stringify(this.props.maintenance))

        this.state = {
            maintenance: maintenance,
            ride: this.props.maintenance.ride,
            employee: this.props.maintenance.managerEmployee,
            editMode: false,
            maintenanceAlert: null,
            employees: [],
            employeesToUpdate: [],
            maintenanceEmployeeList: maintenanceEmployeeList,
        }
    }

    componentDidMount() {
        // maintenanceEmployeeList should be (maintenanceEmployeeList - managerEmployee)
        var employeeList = this.state.maintenanceEmployeeList;
        for (var i = 0; i < employeeList.length; i++) {
            if (employeeList[i].employeeId == this.state.maintenance.managerEmployeeId) {
                employeeList.splice(i, 1);
                break;
            }
        }

        this.setState({
            maintenanceEmployeeList: employeeList,
        })

        // get list of employees
        // loop through list and get employees for each id
        var employees = [];
        var employeeIds = [];
        this.state.maintenance.maintenanceEmployeeWorksAt
        .forEach(element => {
            employeeIds.push(element.employeeId);
        });
        // request array of employeeIds
        requestEmployees(employeeIds)
        .then(response=>{
            this.setState({
                employees: response.data,
                employeesToUpdate: response.data,
            })
        }) 


    }

    componentDidUpdate() {
        // recalculate employeeList if managerEmployee changed
        if (this.state.employee.employeeId != this.state.maintenance.managerEmployeeId) {   
            // make a copy of the maintenanceEmployeeList prop
            var employeeList = JSON.parse(JSON.stringify(this.props.maintenanceEmployeeList));
            for (var i = 0; i < employeeList.length; i++) {
                if (employeeList[i].employeeId == this.state.maintenance.managerEmployeeId) {
                    employeeList.splice(i, 1);
                    requestEmployee(this.state.maintenance.managerEmployeeId)
                        .then(response=>{
                            this.setState({
                                maintenanceEmployeeList: employeeList,
                                // update employee being displayed
                                employee: response.data,

                                // clear the employee list
                                employees: [],
                                employeesToUpdate: []
                            })

                            // remove employees from DB
                            const me = {
                                maintenanceId: this.props.maintenance.maintenanceId,
                                employeeId: ''
                            }
                            removeAllMaintenanceEmployees(me);
                        });
                    // generate unique toast
                    const toastId = 
                        toast('Manager Employee Has Changed! Please Assign New Employees...', {
                            type: 'info'
                        });

                    break;
                }
            }
        }

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

    // get selected employees and store in employees state
    handleChange = (selectedOption) => {

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

    resetEmployees = () => {
        this.setState({
            employeesToUpdate: this.state.employees
        })
        this.saveEmployees();
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
            maintenanceId: this.props.maintenance.maintenanceId,
            employeeId: ''
        }
        removeAllMaintenanceEmployees(me)
        .then(response => {
            // insert the list of employees we're updating with
            this.state.employeesToUpdate.forEach(element => {
                // create new maintenanceEmployeeWorksAt object
                const maintEmployeeWorksAt = {
                    maintenanceId: this.props.maintenance.maintenanceId,
                    employeeId: element.employeeId
                }

                // assign the object to DB
                assignMaintenanceEmployee(maintEmployeeWorksAt, toastId)
            })
        })
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
                // update rides; (we update employee in the componentdidupdate function)
                requestRide(response.data.maintenance.rideId)
                    .then(rideResponse=>{
                        this.setState({
                            ride: rideResponse.data,
                            maintenance: response.data.maintenance,
                            editMode: false,
                            maintenanceAlert: {
                            'toastId': toastId,
                            'alertType': 'success',
                            'alertMessage': 'Update Successful'
                            }
                        })
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
                    <br/>
                    Employees Assigned:
                    <Select
                        name='form-field-name'
                        value={this.formatEmployeesSelect(this.state.employeesToUpdate)}
                        onChange={this.handleChange}
                        multi={true}
                        options={this.formatEmployeesSelect(this.state.maintenanceEmployeeList)}
                    />
                    <br/>
                    <Button key={'listItemSaveEmployeesButton'+this.props.maintenance.maintenanceId}
                        color='primary'
                        onClick={this.saveEmployees}
                    >Save Employees</Button>
                     <Button key={'listItemResetEmployeesButton'+this.props.maintenance.maintenanceId}
                        onClick={this.resetEmployees}
                    >Reset</Button>

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
                            managerEmployeeList: this.props.managerEmployeeList,
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


