import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState, AppThunkAction }  from '../store';

import * as MaintenanceState from '../store/Maintenance';
import * as MaintenanceActions from '../actions/_MaintenanceActions';
import * as EmployeeActions from '../actions/_EmployeeActions';
import * as RideActions from '../actions/_RideActions';

import MaintenanceForm from './forms/MaintenanceForm';
import { MaintenanceListItem } from './MaintenanceListItem';

import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { Button } from 'reactstrap';
import { toast } from 'react-toastify';
import { displayToast } from '../helpers/_displayToast'

import * as moment from 'moment';

const actionCreators = Object.assign(
    MaintenanceActions.actionCreators, 
    EmployeeActions.actionCreators,
    RideActions.actionCreators);

// At runtime, Redux will merge together...
type DataProps =
    MaintenanceState.MaintenanceState        // ... state we've requested from the Redux store
    & typeof actionCreators    // ... plus action creators we've requested
    & RouteComponentProps<{}>; // ... plus incoming routing parameters

class Maintenance extends React.Component<DataProps, {}> {
    componentDidMount() {
        // This method runs when the component is first added to the page        
        this.props.requestMaintenanceEmployees();
        this.props.requestRidesList();
        this.props.requestMaintenanceList();
    }

    componentDidUpdate(prevProps: DataProps) {
        // This method runs when incoming props (e.g., route params) change
        if (!this.props.loadingMaintenanceList && this.props.reloadMaintenanceList) {
            this.props.requestMaintenanceList();
        }

        // update unique toast 
        displayToast(this.props.maintenanceAlert );
    }

    render() {
        return <div>
            <h3>Add Maintenance Form</h3>
            { this.renderCreateNewForm() }

            <h3>List View</h3>
            { this.renderMaintenanceList() }
        </div>
    }

    createNewMaintenance = values => {
        // generate unique toast
        const toastId = 
            toast('Creating Maintenance...', {
                type: 'info'
            });

        this.props.createNewMaintenance(values, toastId);
    }

    updateMaintenance = values => {
        // generate unique toast
        const toastId = 
            toast('Updating Maintenance...', {
                type: 'info'
            });

        this.props.updateMaintenance(values, toastId);
    }

    deleteMaintenance(id) {
        // generate unique toast
        const toastId = 
            toast('Deleting Maintenance...', {
                type: 'info'
            });

        this.props.deleteMaintenance(id, toastId);
    }

    private renderCreateNewForm() {   
        return <MaintenanceForm 
            onSubmit={this.createNewMaintenance}
            form="newMaintenanceForm"
            props={{
                rideList: this.props.rideList,
                maintenanceEmployeeList: this.props.maintenanceEmployeeList,
            }}
        />
    }

    private renderMaintenanceList() {
        return <ListGroup>
            {this.props.maintenanceList.map(item => 
                <MaintenanceListItem
                    key={'listItem'+item.maintenanceId}
                    maintenance={item}
                    updateMaintenance={this.props.updateMaintenance}
                    >                                      
                </MaintenanceListItem>
            )}
        </ListGroup>
    }
}

export default connect(
    (state: ApplicationState) => state.maintenance, // Selects which state properties are merged into the component's props
    actionCreators                 // Selects which action creators are merged into the component's props
)(Maintenance) as typeof Maintenance;