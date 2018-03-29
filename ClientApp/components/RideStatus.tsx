import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState }  from '../store';
//import * as WeatherForecastsState from '../store/WeatherForecasts';
import * as RideStatusState from '../store/RideStatus'
import * as RideTypeState from '../store/RideType'

// At runtime, Redux will merge together...
type DataProps =
    RideStatusState.RideStatusState        // ... state we've requested from the Redux store
    & typeof RideStatusState.actionCreators      // ... plus action creators we've requested
    & RouteComponentProps<{ entity: string }>; // ... plus incoming routing parameters

class FetchData extends React.Component<DataProps, {}> {
    componentWillMount() {
        // This method runs when the component is first added to the page
        this.props.requestRideStatusList();
    }

    componentWillReceiveProps(nextProps: DataProps) {
        // This method runs when incoming props (e.g., route params) change
        this.props.requestRideStatusList();
    }

    public render() {
        return <div>
            <h1>RIDE STATUS TABLE</h1>
            { this.renderRideStatusTable() }
        </div>
    }

    private renderRideStatusTable() {
        return <table className='table'>
            <thead>
                <tr>
                    <th>RideStatusId</th>
                    <th>RideStatus</th>
                </tr>
            </thead>
            <tbody>
            {this.props.rideStatusList.map(ridestatus =>
                <tr key={ ridestatus.rideStatusId }>
                    <td>{ ridestatus.rideStatusId }</td>
                    <td>{ ridestatus.rideStatus }</td>
                </tr>
            )}
            </tbody>
        </table>;
    }
}

export default connect(
    (state: ApplicationState) => state.rideStatus, // Selects which state properties are merged into the component's props
    RideStatusState.actionCreators                 // Selects which action creators are merged into the component's props
)(FetchData) as typeof FetchData;
