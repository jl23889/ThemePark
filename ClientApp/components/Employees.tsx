import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState }  from '../store';
import * as EmployeesState from '../store/Employees';
import * as EmployeeActions from '../actions/_EmployeeActions';
import * as EmployeeTypeActions from '../actions/_EmployeeTypeActions';

import EmployeeForm from './forms/EmployeeForm';

import { Button, Breadcrumb, BreadcrumbItem,  
    Card, CardImage, CardBody, CardTitle, CardText, Fa } from 'mdbreact'
import ReactTable from 'react-table';
import { toast } from 'react-toastify';
import { displayToast } from '../helpers/_displayToast'

// combines action creators from employee and employeetype
const actionCreators = Object.assign(
    EmployeeActions.actionCreators, 
    EmployeeTypeActions.actionCreators);

// At runtime, Redux will merge together...
type DataProps =
    EmployeesState.EmployeesState        // ... state we've requested from the Redux store
    & typeof actionCreators    // ... plus action creators we've requested
    & RouteComponentProps<{ entity: string }>; // ... plus incoming routing parameters

class Employees extends React.Component<DataProps, {}> {
    componentDidMount() {
        // This method runs when the component is first added to the page
        this.props.requestEmployeeTypeList();
        this.props.requestEmployeesList();
    }

    componentDidUpdate(prevProps: DataProps) {
        // This method runs when incoming props (e.g., route params) change
        if (!this.props.loadingEmployeeList && this.props.reloadEmployees) {
            this.props.requestEmployeesList();
        }

        // update unique toast 
        displayToast(this.props.employeeAlert );
    }

    render() {
        return <div className="row justify-content-center">
            <div className="col-3">
                { this.renderCreateNewForm() }
            </div>
            <div className="col-9">
                <Card><CardBody>
                    <CardTitle className="h5 text-center mb-5">Employee Table</CardTitle>
                { (!this.props.loadingEmployeeList) ? this.renderEmployeesTable() :
                    <h3>LOADING TABLE...</h3>}</CardBody></Card>
            </div>
        </div>
    }

    createNewEmployee = values => {
        const toastId = 
            toast('Creating Employee...', {
                type: 'info'
            });
        this.props.createNewEmployee(values,toastId);
    }

    updateEmployee = values => {
        // generate unique toast
        const toastId = 
            toast('Updating Employee...', {
                type: 'info'
            });
        this.props.updateEmployee(values, toastId);
    }

    deleteEmployee(id) {
        const toastId =
            toast('Deleting Employee...', {
                type: 'info'
            });
        this.props.deleteEmployee(id,toastId);
    }

    // lookup employee type by id from employeeStatusType prop
    private lookupEmployeeType(id) {
        const rtl = this.props.employeeTypeList;

        if (typeof rtl !== 'undefined' && rtl.length > 0) {
            for (var i = 0; i < rtl.length; i++) {
                if (id == rtl[i].employeeTypeId) {
                    return rtl[i].employeeType;
                }
            }
            return "Unknown";
        }
    }

    // generate select element from employeeTypeList prop
    private lookupEmployeeTypeFilter(filter, onChange) {
        const rtl = this.props.employeeTypeList;

        if (typeof rtl !== 'undefined' && rtl.length > 0) {
            return <select
                onChange={event => onChange(event.target.value)}
                style={{ width: "100%" }}
                value={filter ? filter.value : "all"}
            >
                <option value="all">Show All</option>
                {rtl.map((rs, i) => 
                    <option value={rtl[i].employeeTypeId}
                        key={i}>
                        {rtl[i].employeeType}
                    </option>
                )}
            </select>
        }
    }

    private renderCreateNewForm() {        
        return <EmployeeForm
            onSubmit={this.createNewEmployee}
            form="newEmployeeForm"
            props={{
                employeeTypeList: this.props.employeeTypeList
            }}
        />
    }

    private renderEmployeesTable() {
        return <div>
            <ReactTable 
                data={this.props.employeeList}
                columns={[
                    {
                        Header: "First Name",
                        accessor: "empFirstName"
                    },
                    {
                        Header: "Last Name",
                        accessor: "empLastName",
                    },
                    {
                        Header: "Employee Type",
                        accessor: "empType",
                        Cell: row => (
                            this.lookupEmployeeType(row.value)
                        ),
                        Filter: ({ filter, onChange }) =>
                            this.lookupEmployeeTypeFilter(filter, onChange),
                        filterMethod: (filter, row) => {
                            if (filter.value == "all") {
                                return true;
                            }
                            return row.empType == filter.value;
                        },
                    },
                    {
                        Header: "Phone Number",
                        accessor: "empPhoneNumber",
                        filterable: false
                    },
                    {
                    	Header: "Address",
                    	accessor: "empAddressStreet"
                    },
                    {
                    	Header: "City",
                    	accessor: "empAddressCity"
                    },
                    {
                    	Header: "State",
                    	accessor: "empAddressState"
                    },
                    {
                    	Header: "Zip Code",
                    	accessor: "empAddressZipCode"
                    },
                ]}
                className="-striped -highlight"
                filterable
                defaultPageSize={15}
                SubComponent={row => {
                    const { original } = row;
                    // contains update form
                    return (
                    <div className="container" style={{ width: "100%" }}>
                        <EmployeeForm 
                            onSubmit={this.updateEmployee}
                            initialValues={original}
                            form={"form"+original.employeeId}
                            props={{
                                employeeTypeList: this.props.employeeTypeList
                            }}
                        />
                        <Button color="danger" onClick={this.deleteEmployee.bind(this, original) } >
                            Delete
                        </Button>
                    </div>
                    );
                }}
            />
        </div>;
    }
}

export default connect(
    (state: ApplicationState) => state.employees, // Selects which state properties are merged into the component's props
    actionCreators                 // Selects which action creators are merged into the component's props
)(Employees) as typeof Employees;