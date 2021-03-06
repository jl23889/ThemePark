import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState }  from '../store';
import * as LookupState from '../store/Lookup';
import * as LookupActions from '../actions/_LookupActions'

import ReactTable from 'react-table';
import { DropdownButton, MenuItem } from 'react-bootstrap'

// import lookuptable components
import EmployeeType from './lookupTables/EmployeeType';
import RideStatus from './lookupTables/RideStatus';
import RideType from './lookupTables/RideType';
import TicketType from './lookupTables/TicketType';
import WeatherType from './lookupTables/WeatherType';


// At runtime, Redux will merge together...
type DataProps =
    LookupState.LookupState
    & typeof LookupActions.actionCreators        // ... state we've requested from the Redux store    // ... plus action creators we've requested
    & RouteComponentProps<{ tableToLoad: string }>; // ... plus incoming routing parameters

class Lookup extends React.Component<DataProps, {}> {
    componentDidMount() {
        // This method runs when the component is first added to the page
        this.props.selectLookupTable(this.props.match.params.tableToLoad)
    }

    componentDidUpdate(prevProps: DataProps) {
        // This method runs when incoming props (e.g., route params) change
        this.props.selectLookupTable(this.props.match.params.tableToLoad)
    }

    render() {
        return <div>
        	<h1>Select A Lookup Table</h1>
            { this.renderDropdown() }
            { this.renderLookupTable() }  
        </div>
    }

    private renderLookupTable() {
    	switch (this.props.lookupTable) {
    		case 'ridestatus':
    			return <RideStatus/>
			case 'ridetype':
				return <RideType/>    		
    		case 'employeetype':
    			return <EmployeeType/>
            case 'tickettype':
                return <TicketType />
            case 'weathertype':
                return <WeatherType />
    		default:
    			return
    	}
    }

    private renderDropdown() {        
        return <DropdownButton
            bsStyle={'primary'}
            title={'Select Table'}
            id={`dropdown-basic`}
        >
            <MenuItem eventKey="1">
                <Link to='/lookup/ridestatus'>
            	    Ride Status
                </Link>
            </MenuItem>
            <MenuItem eventKey="2">
                <Link to='/lookup/ridetype'>
            	    Ride Type
                </Link>
        	</MenuItem>
            <MenuItem eventKey="3">
                <Link to='/lookup/employeetype'>
            	    Employee Type
                </Link>
        	</MenuItem>
            <MenuItem eventKey="4">
                <Link to='/lookup/tickettype'>
                    Ticket Type
                </Link>
            </MenuItem>
            <MenuItem eventKey="5">
                <Link to='/lookup/weathertype'>
                    Weather Type
                </Link>
            </MenuItem>

        </DropdownButton>
    }
}

export default connect(
    (state: ApplicationState) => state.lookup, // Selects which state properties are merged into the component's props
    LookupActions.actionCreators                 // Selects which action creators are merged into the component's props
)(Lookup) as typeof Lookup;
