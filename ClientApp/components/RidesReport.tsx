import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState, AppThunkAction }  from '../store';

import { requestRide, requestRidesById, requestDetailedVisitRide,
	requestTicketSales, requestSummaryVisit } from '../actions/_RideActions';

import { Alert, Ride, RideLineData, RideBarData } from '../models/_DataModels'

import { Image, Table } from 'react-bootstrap';
import { Button, Jumbotron } from 'reactstrap';
import { toast } from 'react-toastify';
import { displayToast } from '../helpers/_displayToast'
import {Bar,Doughnut,Line} from 'react-chartjs-2';
import DatePicker from 'react-datepicker'

import Select from 'react-select';

import * as moment from 'moment';

interface ListItemProps {
    rideList: Ride[];
} 

interface RideSelect {
    rideId: string;
    rideName: string;
}

interface ListItemState {
    rideSelected: Ride;
    startDate: Date;
    endDate: Date;
    alert: Alert;
    lineData: Object;
    rawLineData: RideLineData[];
    barData: Object;
    rawBarData: RideBarData[];
    showLine: boolean;
    showBar: boolean;
}

export class RidesReport extends React.Component<ListItemProps,ListItemState> {
    constructor(props){
        super(props);

        this.state = {
            rideSelected: this.props.rideList[0],
            startDate: moment(new Date()).subtract(7,'d').toDate(),
            endDate: new Date(),
            alert: null,
            lineData: null,
            rawLineData: [],
            barData: null,
            rawBarData: [],
            showLine: true,
            showBar: false,
        }
    }

    componentDidMount() {
    }

    componentDidUpdate() {

        // update unique toast 
        displayToast(this.state.alert );
    }

    render() {
        return <div>
            {this.renderView()}
        </div>
    }

    // formats rides for select form
    formatRidesSelect(rideList) {
        // format rides for select
        var rideSelect = [];
        if (rideList.length >= 1) {
            rideList.forEach(element => {
                rideSelect.push({
                    value: element.rideId,
                    label: element.rideName,
                })
            });
        }
        return rideSelect;
    }

    // get selected rides and store in rides state
    handleChange = (selectedOption) => {

        var rideIds = [];
        var rides = [];

        rideIds.push(selectedOption.value);
        // request rides by array of rideIds
        requestRidesById(rideIds)
        .then(response=>{
            this.setState({
                rideSelected: response.data[0],
            })
        }) 
    }

    // sets date 
    setStartDate = (date) => {
        this.setState({
        	startDate: moment(date).toDate(),
        })
    }

    // sets date 
    setEndDate = (date) => {
        this.setState({
			endDate: moment(date).toDate()
        })
    }

    // generate weeklydata
    generateWeeklyData = () => {
    	const values = {
    		rideId: this.state.rideSelected.rideId,
    		startTime: moment(this.state.startDate).subtract(1,'d').toDate(),
    		endTime: this.state.endDate
    	}

    	const toastId = 
            toast('Generating Data...', {
                type: 'info'
            });

        requestDetailedVisitRide(values)
        .then(response=>{
        	var ageGroup1 = []
        	var ageGroup2 = []
        	var ageGroup3 = []
        	var ageGroup4 = []
        	var totals = []
        	var dates = []
        	response.data.forEach((element) => {
        		ageGroup1.push(element.ageGroup1_0_to_18);
        		ageGroup2.push(element.ageGroup2_19_to_30);
        		ageGroup3.push(element.ageGroup3_31_to_50);
        		ageGroup4.push(element.ageGroup4_over50);
        		totals.push(element.count);
        		dates.push(moment(element.date).format('MM-DD'));
            })

            const linedata = {
			  labels: dates,
			  datasets: [
			    {
			      label: '0-18',
			      lineTension: 0.1,
			      backgroundColor: 'rgba(231,240,105,0.4)',
			      borderColor: 'rgba(231,240,105,1)',
			      borderCapStyle: 'butt',
			      borderDash: [],
			      borderDashOffset: 0.0,
			      borderJoinStyle: 'miter',
			      pointBorderColor: 'rgba(231,240,105,1)',
			      pointBackgroundColor: '#fff',
			      pointHoverBackgroundColor: 'rgba(231,240,105,1)',
			      pointHoverBorderColor: 'rgba(231,240,220,1)',
			      data: ageGroup1,
			    },
			    {
			      label: '0-30',
			      lineTension: 0.1,
			      backgroundColor: 'rgba(191,105,240,0.4)',
			      borderColor: 'rgba(191,105,240,1)',
			      borderCapStyle: 'butt',
			      borderDash: [],
			      borderDashOffset: 0.0,
			      borderJoinStyle: 'miter',
			      pointBorderColor: 'rgba(191,105,240,1)',
			      pointBackgroundColor: '#fff',
			      pointHoverBackgroundColor: 'rgba(191,105,240,1)',
			      pointHoverBorderColor: 'rgba(220,220,220,1)',
			      data: ageGroup2.map((num,id) => {
		      	    return num + ageGroup1[id];
			      }),
			    },
			    {
			      label: '0-50',
			      lineTension: 0.1,
			      backgroundColor: 'rgba(75,192,192,0.4)',
			      borderColor: 'rgba(75,192,192,1)',
			      borderCapStyle: 'butt',
			      borderDash: [],
			      borderDashOffset: 0.0,
			      borderJoinStyle: 'miter',
			      pointBorderColor: 'rgba(75,192,192,1)',
			      pointBackgroundColor: '#fff',
			      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
			      pointHoverBorderColor: 'rgba(220,220,220,1)',
			      data: ageGroup3.map((num,id) => {
		      	    return num + ageGroup2[id] + ageGroup1[id];
			      }),
			    },
			    {
			      label: 'All Age Groups',
			      lineTension: 0.1,
			      backgroundColor: 'rgba(255,99,132,0.2)',
			      borderColor: 'rgba(255,99,132,1)',
			      borderWidth: 1,
			      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
			      hoverBorderColor: 'rgba(255,99,132,1)',
			      data: totals,
			    },
			  ]
			};

	        this.setState({
	            lineData: linedata,
	            rawLineData: response.data,
	            alert: {
                    'toastId': toastId,
                    'alertType': 'success',
                    'alertMessage': 'Report Generation Successful!'
                },
	        })
        })
        .catch(error => {
        	this.setState({
	            lineData: null,
	            rawLineData: [],
	            alert: {
                    'toastId': toastId,
                    'alertType': 'error',
                    'alertMessage': 'Report Generation Failed!'
                },
	        })
        }) 
    }

    // generate ride
    generateRideData = () => {
    	const values = {
    		startTime: moment(this.state.startDate).subtract(1,'d').toDate,
    		endTime: this.state.endDate
    	}

    	const toastId = 
            toast('Creating Employee...', {
                type: 'info'
            });

        requestSummaryVisit(values)
        .then(response=>{
        	var maxCounts = []
        	var averages = []
        	var totals = []
        	var names = []
        	const calendarEvents = response.data.forEach((element) => {
        		maxCounts.push(element.maxCount);
        		averages.push(element.average);
        		totals.push(element.count);
        		names.push(element.name);
            })

            const bardata = {
			  labels: names,
			  datasets: [
			    {
			      label: 'Average',
			      lineTension: 0.1,
			      backgroundColor: 'rgba(231,240,105,0.4)',
			      borderColor: 'rgba(231,240,105,1)',
			      borderCapStyle: 'butt',
			      borderDash: [],
			      borderDashOffset: 0.0,
			      borderJoinStyle: 'miter',
			      pointBorderColor: 'rgba(231,240,105,1)',
			      pointBackgroundColor: '#fff',
			      pointHoverBackgroundColor: 'rgba(231,240,105,1)',
			      pointHoverBorderColor: 'rgba(231,240,220,1)',
			      data: averages,
			    },
			    {
			      label: 'Max',
			      lineTension: 0.1,
			      backgroundColor: 'rgba(191,105,240,0.4)',
			      borderColor: 'rgba(191,105,240,1)',
			      borderCapStyle: 'butt',
			      borderDash: [],
			      borderDashOffset: 0.0,
			      borderJoinStyle: 'miter',
			      pointBorderColor: 'rgba(191,105,240,1)',
			      pointBackgroundColor: '#fff',
			      pointHoverBackgroundColor: 'rgba(191,105,240,1)',
			      pointHoverBorderColor: 'rgba(220,220,220,1)',
			      data: maxCounts,
			    },
			  ]
			};

	        this.setState({
	            barData: bardata,
	            rawBarData: response.data,
	            alert: {
                    'toastId': toastId,
                    'alertType': 'success',
                    'alertMessage': 'Report Generation Successful!'
                },
	        })
        }) 
        .catch(error => {
        	this.setState({
	            barData: null,
	            rawBarData: [],
	            alert: {
                    'toastId': toastId,
                    'alertType': 'error',
                    'alertMessage': 'Report Generation Failed!'
                },
	        })
        }) 
    }

    // toggle display
    showLine = () => {
    	this.setState({
    		showLine: true,
    		showBar: false,
    	})
    }

    showBar = () => {
    	this.setState({
    		showLine: false,
    		showBar: true,
    	})
    }

    private renderLine() {
    	var rows = [];
    	this.state.rawLineData.forEach(element => 
			rows.push(
				<tr>
		            <th scope="row">{moment(element.date).format('MM-DD-YYYY')}</th>
		            <td>{element.count}</td>
		            <td>{element.ageGroup1_0_to_18}</td>
		            <td>{element.ageGroup2_19_to_30}</td>
		            <td>{element.ageGroup3_31_to_50}</td>
		            <td>{element.ageGroup4_over50}</td>
		        </tr>	
			)
    	)
    	return <div>
    		<h3>Weekly Ride Attendance (By Age Group)</h3>
	        <div className="row">
	        	<div className="col-md-3">
		        <p>Select Start Date</p>
	            <DatePicker
	                inline
	                selected={moment(this.state.startDate)}
	                onChange={this.setStartDate}
	                minDate={moment().subtract(90, "days")}
	                maxDate={moment()}
	            />
	            </div>
	            <div className="col-md-3">
		        <p>Select End Date</p>
	            <DatePicker
	                inline
	                selected={moment(this.state.endDate)}
	                onChange={this.setEndDate}
	                minDate={moment().subtract(90, "days")}
	                maxDate={moment()}
	            />
	            </div>
	            <div className="col-md-3">
	            <p>Select Ride</p>
	            <Select
	                name='form-field-name'
	                value={this.state.rideSelected !== undefined ? this.state.rideSelected.rideId : ''}
	                onChange={this.handleChange}
	                options={this.formatRidesSelect(this.props.rideList)}
	            />
	            </div>
	            <div className="col-md-3">
	            <Button color="success"
	                onClick={this.generateWeeklyData}>
	                Generate Report
                </Button>
	            </div>
            </div>
        	<h3>{this.state.lineData == null ? 
        		'No Ride Selected' : 
        		<Line data={this.state.lineData}/>
        	}</h3>
        	 <Table>
		        <thead>
		          <tr>
		            <th>Date</th>
		            <th>Total</th>
		            <th>Ages 0-18</th>
		            <th>Ages 19-30</th>
		            <th>Ages 31-50</th>
		            <th>Ages 50+</th>
		          </tr>
		        </thead>
		        <tbody>
		        	{rows}
	        	</tbody>
		      </Table>
    	</div>
	}

    private renderBar() {
        var rows = [];
        this.state.rawBarData.forEach(element =>
            rows.push(
                <tr>
                    <th scope="row">{element.name}</th>
                    <td>{element.average.toFixed(2)}</td>
                    <td>{element.total}</td>                    
                    <td>{moment(element.maxDate).format('MM-DD-YYYY')}</td>
                    <td>{element.maxCount}</td>
                    <td>{element.ageGroup1_0_to_18}</td>
                    <td>{element.ageGroup2_19_to_30}</td>
                    <td>{element.ageGroup3_31_to_50}</td>
                    <td>{element.ageGroup4_over50}</td>
                </tr>
            )
        )
    	return <div>
    		<h3>Ride Attendance (All Rides)</h3>
	        <div className="row">
	        	<div className="col-md-3">
		        <p>Select Start Date</p>
	            <DatePicker
	                inline
	                selected={moment(this.state.startDate)}
	                onChange={this.setStartDate}
	                minDate={moment().subtract(90, "days")}
	                maxDate={moment()}
	            />
	            </div>
	        	<div className="col-md-3">
		        <p>Select End Date</p>
	            <DatePicker
	                inline
	                selected={moment(this.state.endDate)}
	                onChange={this.setEndDate}
	                minDate={moment().subtract(90, "days")}
	                maxDate={moment()}
	            />
	            </div>
	            <div className="col-md-3">
	            <Button color="success"
	                onClick={this.generateRideData}>
	                Generate Report
                </Button>
	            </div>
            </div>
        	<h3>{this.state.barData == null ? 
        		'No Data Generated' : 
        		<Bar data={this.state.barData}/>
            }</h3>
            <Table>
                <thead>
                    <tr>
                        <th>Ride</th>
                        <th>Average Visits</th>
                        <th>Total Visits  </th>
                        <th>Date of Peak  </th>
                        <th>Peak Visits   </th>
                        <th>Ages 0-18 </th>
                        <th>Ages 19-30</th>
                        <th>Ages 31-50</th>
                        <th>Ages 50+  </th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </Table>
    	</div>
	}
	       

    private renderView() {
        return <div><Jumbotron>
	        <h1 className="display-3">View Report
	        	<Button>
                    <Link to='/rides/employees'>Go To Assign Employees</Link>
                </Button>
                <Button>
                    <Link to='/rides/table'>Go To Rides Table</Link>
                </Button>
	        </h1>

	        <Button color="info"
	        	onClick={this.showLine}>                
	        	Show Ride By Age Group
            </Button>
            <Button color="info"
            	onClick={this.showBar}>    
                Show All Rides
            </Button>
	        
	        </Jumbotron>
	        {this.state.showLine ? this.renderLine() : ''}
	        {this.state.showBar ? this.renderBar() : ''}
	        
        </div>
    }
}


