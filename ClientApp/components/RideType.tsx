import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState }  from '../store';
//import * as WeatherForecastsState from '../store/WeatherForecasts';
import * as RideTypeState from '../store/RideType'

// At runtime, Redux will merge together...
type DataProps =
    RideTypeState.RideTypeState        // ... state we've requested from the Redux store
    & typeof RideTypeState.actionCreators      // ... plus action creators we've requested
    & RouteComponentProps<{ entity: string }>; // ... plus incoming routing parameters

class RideType extends React.Component<DataProps, {}> {
    componentWillMount() {
        // This method runs when the component is first added to the page
        this.props.requestRideTypeList();
    }

    componentWillReceiveProps(nextProps: DataProps) {
        // This method runs when incoming props (e.g., route params) change
        //this.props.requestRideTypeList();
    }

    public render() {
        return <div>
            <h1>RIDE TYPE TABLE</h1>
            { this.renderRideTypeTable() }
        </div>
    }

    private renderRideTypeTable() {
        return <table className='table'>
            <thead>
                <tr>
                    <th>RideTypeId</th>
                    <th>RideType</th>
                </tr>
            </thead>
            <tbody>
            {this.props.rideTypeList.map(ridestatus =>
                <tr key={ ridestatus.rideTypeId }>
                    <td>{ ridestatus.rideTypeId }</td>
                    <td>{ ridestatus.rideType }</td>
                </tr>
            )}
            </tbody>
        </table>;
    }
}

export default connect(
    (state: ApplicationState) => state.rideType, // Selects which state properties are merged into the component's props
    RideTypeState.actionCreators                 // Selects which action creators are merged into the component's props
)(RideType) as typeof RideType;