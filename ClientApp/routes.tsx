import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './components/Home';
import Rides from './components/Rides';
import Employees from './components/Employees';

import Lookup from './components/Lookup';
import Login from './components/Login';
import Register from './components/Register';

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

    <Route path='/lookup/:tableToLoad?' component={ Lookup } />
</Layout>;
