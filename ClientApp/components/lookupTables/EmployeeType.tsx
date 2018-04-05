import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState }  from '../../store';
import * as EmployeeTypeState from '../../store/EmployeeType';
import * as EmployeeTypeActions from '../../actions/_EmployeeTypeActions';

import EmployeeTypeForm from '../forms/EmployeeTypeForm';

import ReactTable from 'react-table';

// At runtime, Redux will merge together...
type DataProps =
    EmployeeTypeState.EmployeeTypeState        // ... state we've requested from the Redux store
    & typeof EmployeeTypeActions.actionCreators      // ... plus action creators we've requested
    & RouteComponentProps<{}>; // ... plus incoming routing parameters

class EmployeeType extends React.Component<DataProps, {}> {
    componentDidMount() {
        // This method runs when the component is first added to the page
        this.props.requestEmployeeTypeList();
    }

    componentDidUpdate(nextProps: DataProps) {
        // This method runs when incoming props (e.g., route params) change
        this.props.requestEmployeeTypeList();
    }

    render() {
        return <div>
            <h1>Employee Type Table</h1>
            <h3>Create New</h3>
            { this.renderCreateNewForm() }
            { this.renderEmployeeTypeTable() }
        </div>
    }

    createNewEmployeeType = values => {
        this.props.createNewEmployeeType(values);
    }

    updateEmployeeType = values => {
        this.props.updateEmployeeType(values);
    }

    deleteEmployeeType(id) {
        this.props.deleteEmployeeType(id);
    }

    private renderCreateNewForm() {        
        return <EmployeeTypeForm 
            onSubmit={this.createNewEmployeeType}
            form="newForm"
        />
    }

    private renderEmployeeTypeTable() {
        return <div>
            <ReactTable 
                data={this.props.employeeTypeList}
                columns={[
                    {
                        Header: "EmployeeTypeId",
                        accessor: "employeeTypeId"
                    },
                    {
                        Header: "EmployeeType",
                        accessor: "employeeType",
                    }
                ]}
                className="-highlight"
                filterable
                SubComponent={row => {
                    const { original } = row;
                    // contains update form
                    return (
                    <div className="container">
                        <EmployeeTypeForm 
                            onSubmit={this.updateEmployeeType}
                            initialValues={original}
                            form={"form"+original.employeeTypeId}
                        />
                        <button onClick={this.deleteEmployeeType.bind(this, original) } >
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
    (state: ApplicationState) => state.employeeType, // Selects which state properties are merged into the component's props
    EmployeeTypeActions.actionCreators                 // Selects which action creators are merged into the component's props
)(EmployeeType);