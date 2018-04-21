import * as WeatherForecasts from './WeatherForecasts';
import * as Counter from './Counter';
import * as RideStatus from './RideStatus'
import * as RideType from './RideType'
import * as Rides from './Rides'
import * as Login from './Login'
import * as Register from './Register'
import * as Transaction from './Transaction'
import * as Ticket from './Ticket'
import * as TicketType from './TicketType'
import * as WeatherType from './WeatherType'

import * as Customers from './Customers'
import * as CustomerProfile from './CustomerProfile'

import * as Employees from './Employees'
import * as EmployeeType from './EmployeeType'
import * as EmployeeProfile from './EmployeeProfile'

import * as Maintenance from './Maintenance'
import * as Lookup from './Lookup'

import { reducer as formReducer } from 'redux-form'
import { state as formState } from 'redux-form'

// The top-level state object
export interface ApplicationState {
    counter: Counter.CounterState;
    weatherForecasts: WeatherForecasts.WeatherForecastsState;

    rideStatus: RideStatus.RideStatusState;
    rideType: RideType.RideTypeState;
    rides: Rides.RidesState;

    ticket: Ticket.TicketState;
    ticketType: TicketType.TicketTypeState;
    transaction: Transaction.TransactionState;

    weatherType: WeatherType.WeatherTypeState;

    login: Login.LoginState;
    register: Register.RegisterState;

    customers: Customers.CustomersState;
    customerProfile: CustomerProfile.CustomerProfileState;

    employees: Employees.EmployeesState;
    employeeType: EmployeeType.EmployeeTypeState;
    employeeProfile: EmployeeProfile.EmployeeProfileState;

    maintenance: Maintenance.MaintenanceState;

    lookup: Lookup.LookupState;
    form: formState;
}

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export const reducers = {
    counter: Counter.reducer,
    weatherForecasts: WeatherForecasts.reducer,

    rides: Rides.reducer,
    rideStatus: RideStatus.reducer,
    rideType: RideType.reducer,

    ticket: Ticket.reducer,
    ticketType: TicketType.reducer,
    transaction: Transaction.reducer,

    weatherType: WeatherType.reducer,

    login: Login.reducer,
    register: Register.reducer,

    customers: Customers.reducer,
    customerProfile: CustomerProfile.reducer,

    employees: Employees.reducer,
    employeeType: EmployeeType.reducer,
    employeeProfile: EmployeeProfile.reducer,

    maintenance: Maintenance.reducer,

    lookup: Lookup.reducer,
    form: formReducer,
};

// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
