import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState }  from '../../store';
import * as TicketTypeState from '../../store/TicketType';
import * as TicketTypeActions from '../../actions/_TicketTypeActions'

import TicketTypeForm from '../forms/TicketTypeForm';

import ReactTable from 'react-table';

// At runtime, Redux will merge together...
type DataProps =
    TicketTypeState.TicketTypeState        // ... state we've requested from the Redux store
    & typeof TicketTypeActions.actionCreators      // ... plus action creators we've requested
    & RouteComponentProps<{ entity: string }>; // ... plus incoming routing parameters

class TicketType extends React.Component<DataProps, {}> {
    componentDidMount() {
        // This method runs when the component is first added to the page
        this.props.requestTicketTypeList();
    }

    componentDidUpdate(nextProps: DataProps) {
        // This method runs when incoming props (e.g., route params) change
        this.props.requestTicketTypeList();
    }

    render() {
        return <div>
            <h1>Ticket Type Table</h1>
            <h3>Create New</h3>
            { this.renderCreateNewForm() }
            { this.renderTicketTypeTable() }
        </div>
    }

    createNewTicketType = values => {
        this.props.createNewTicketType(values);
    }

    updateTicketType = values => {
        this.props.updateTicketType(values);
    }

    deleteTicketType(id) {
        this.props.deleteTicketType(id);
    }

    private renderCreateNewForm() {        
        return <TicketTypeForm 
            onSubmit={this.createNewTicketType}
            form="newForm"
        />
    }

    private renderTicketTypeTable() {
        return <div>
            <ReactTable 
                data={this.props.ticketTypeList}
                columns={[
                    {
                        Header: "TicketTypeId",
                        accessor: "ticketTypeId"
                    },
                    {
                        Header: "TicketType",
                        accessor: "ticketType",
                    }
                ]}
                className="-highlight"
                filterable
                SubComponent={row => {
                    const { original } = row;
                    // contains update form
                    return (
                    <div className="container">
                        <TicketTypeForm 
                            onSubmit={this.updateTicketType}
                            initialValues={original}
                            form={"form"+original.ticketTypeId}
                        />
                        <button onClick={this.deleteTicketType.bind(this, original) } >
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
    (state: ApplicationState) => state.ticketType, // Selects which state properties are merged into the component's props
    TicketTypeActions.actionCreators                 // Selects which action creators are merged into the component's props
)(TicketType);