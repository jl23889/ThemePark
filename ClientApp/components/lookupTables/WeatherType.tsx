import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import * as WeatherTypeState from '../../store/WeatherType';
import * as WeatherTypeActions from '../../actions/_WeatherTypeActions'

import WeatherTypeForm from '../forms/WeatherTypeForm';

import ReactTable from 'react-table';

// At runtime, Redux will merge together...
type DataProps =
    WeatherTypeState.WeatherTypeState        // ... state we've requested from the Redux store
    & typeof WeatherTypeActions.actionCreators      // ... plus action creators we've requested
    & RouteComponentProps<{ entity: string }>; // ... plus incoming routing parameters

class WeatherType extends React.Component<DataProps, {}> {
    componentDidMount() {
        // This method runs when the component is first added to the page
        this.props.requestWeatherTypeList();
    }

    componentDidUpdate(nextProps: DataProps) {
        // This method runs when incoming props (e.g., route params) change
        this.props.requestWeatherTypeList();
    }

    render() {
        return <div>
            <h1>Weather Type Table</h1>
            <h3>Create New</h3>
            {this.renderCreateNewForm()}
            {this.renderWeatherTypeTable()}
        </div>
    }

    createNewWeatherType = values => {
        this.props.createNewWeatherType(values);
    }

    updateWeatherType = values => {
        this.props.updateWeatherType(values);
    }

    deleteWeatherType(id) {
        this.props.deleteWeatherType(id);
    }

    private renderCreateNewForm() {
        return <WeatherTypeForm
            onSubmit={this.createNewWeatherType}
            form="newForm"
        />
    }

    private renderWeatherTypeTable() {
        return <div>
            <ReactTable
                data={this.props.weatherTypeList}
                columns={[
                    {
                        Header: "WeatherTypeId",
                        accessor: "weatherTypeId"
                    },
                    {
                        Header: "WeatherType",
                        accessor: "weatherType",
                    }
                ]}
                className="-highlight"
                filterable
                SubComponent={row => {
                    const { original } = row;
                    // contains update form
                    return (
                        <div className="container">
                            <WeatherTypeForm
                                onSubmit={this.updateWeatherType}
                                initialValues={original}
                                form={"form" + original.weatherTypeId}
                            />
                            <button onClick={this.deleteWeatherType.bind(this, original)} >
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
    (state: ApplicationState) => state.weatherType, // Selects which state properties are merged into the component's props
    WeatherTypeActions.actionCreators                 // Selects which action creators are merged into the component's props
)(WeatherType);