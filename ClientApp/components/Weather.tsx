import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState, AppThunkAction }  from '../store';

import * as WeatherActions from '../actions/_WeatherActions';
import * as WeatherTypeActions from '../actions/_WeatherTypeActions';
import * as WeatherState from '../store/Weather';
import WeatherForm from './forms/WeatherForm';

import { Alert } from '../models/_DataModels';

import { Breadcrumb, BreadcrumbItem,  
    Card, CardImage, CardBody, CardTitle, CardText, Fa } from 'mdbreact'
import { Image, Table } from 'react-bootstrap';
import { Button } from 'reactstrap';
import { toast } from 'react-toastify';
import { displayToast } from '../helpers/_displayToast'
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import ReactTable from 'react-table';

import Select from 'react-select';
import DatePicker from 'react-datepicker'

import * as moment from 'moment';

const actionCreators = Object.assign(
    WeatherActions.actionCreators, WeatherTypeActions.actionCreators);

type DataProps =
    WeatherState.WeatherState        // ... state we've requested from the Redux store
    & typeof actionCreators       // ... plus action creators we've requested
    & RouteComponentProps<{}>; // ... plus incoming routing parameters

class Weather extends React.Component<DataProps, {}> {
    componentDidMount() {
        this.props.requestWeather;
    }

    componentDidUpdate(prevProps: DataProps) {
        if (this.props.reloadWeathers) {
            this.props.requestWeather;
         }

        // update unique toast 
        displayToast(this.props.weatherAlert);
    }

    render() {
        return <div className="row justify-content-center">
            <div className="row justify-content-center">
                <div className="col-3">
                    {this.renderCreateNewWeatherForm()}
                </div>
                <div className="col-8">
                    <Card><CardBody>
                        <CardTitle className="h5 text-center mb-5">Weather Table</CardTitle>
                        {this.renderWeatherTable()}
                        </CardBody></Card>
                </div>
            </div>
        </div>
    }

    createNewWeather = values => {
        // generate unique toast
        const toastId =
            toast('Creating Weather...', {
                type: 'info'
            });

        this.props.createNewWeather(values, toastId);
    }

    updateWeather = values => {
        // generate unique toast
        const toastId =
            toast('Updating Weather...', {
                type: 'info'
            });

        this.props.updateWeather(values, toastId);
    }

    deleteWeather(id) {
        // generate unique toast
        const toastId =
            toast('Deleting Weather...', {
                type: 'info'
            });

        this.props.deleteWeather(id, toastId);
    }

    private renderCreateNewWeatherForm() {
        return <WeatherForm
            onSubmit={this.createNewWeather}
            form="newWeatherForm"
            props={{
                date: this.props.date,
            }}
        />
    }

    private renderWeatherTable() {
        return <div>
            <ReactTable
                data={this.props.weatherList}
                columns={[
                    {
                        Header: "Date",
                        accessor: "date"
                    },
                    {
                        Header: "Weather",
                        accessor: "weatherType",
                        filterable: false
                    }
                ]}
                className="-striped -highlight"
                filterable
                defaultPageSize={10}
                SubComponent={row => {
                    const { original } = row;
                    // contains update form
                    return (
                        <div className="container" style={{ width: "100%" }}>
                            <WeatherForm
                                onSubmit={this.updateWeather}
                                initialValues={original}
                                form={"form" + original.date}
                                props={{
                                    weatherList: this.props.weatherList
                                }}
                            />
                            <Button color="danger" onClick={this.deleteWeather.bind(this, original)} >
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
    (state: ApplicationState) => state.weather, // Selects which state properties are merged into the component's props
    actionCreators                 // Selects which action creators are merged into the component's props
)(Weather) as typeof Weather;