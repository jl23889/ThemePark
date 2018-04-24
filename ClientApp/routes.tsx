import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './components/Home';
import Rides from './components/Rides';
import Employees from './components/Employees';
import Customers from './components/Customers';
import Weather from './components/forms/WeatherForm';

import Lookup from './components/Lookup';
import Login from './components/Login';
import Register from './components/Register';
import TicketScan from './components/TicketScan'
import TicketTransaction from './components/TicketTransaction';

import CustomerProfile from './components/CustomerProfile';
import EmployeeProfile from './components/EmployeeProfile';
import Maintenance from './components/Maintenance';

import Counter from './components/Counter';
import { ToastContainer } from 'react-toastify';

export const routes =
<Layout>
	<ToastContainer/>
    <Route exact path='/' component={ Login } />
    <Route path='/counter' component={ Counter } />
    <Route path='/rides/:viewType?' component={ Rides } />
    <Route path='/employees' component={ Employees } />    
    <Route path='/login' component={ Login } />
    <Route path='/register' component={ Register } />
    <Route path='/profile' component={ EmployeeProfile } />
    <Route path='/maintenance/:viewType?' component={ Maintenance } />
    <Route path='/ticket/purchase' component={ TicketTransaction }/>
    <Route path='/ticket/scan' component={ TicketScan }/>
    <Route path='/customerProfile' component={CustomerProfile} />
    <Route path='/lookup/:tableToLoad?' component={Lookup} />
    <Route path='/weather' component={ Weather } />
</Layout>;
