import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './components/Home';
import Rides from './components/Rides';
import RideStatus from './components/RideStatus';
import RideType from './components/RideType';
import EmployeeType from './components/EmployeeType';

import Counter from './components/Counter';


export const routes = <Layout>
    <Route exact path='/' component={ Home } />
    <Route path='/counter' component={ Counter } />
    <Route path='/rides' component={ Rides } />
    <Route path='/lookup/ridestatus' component={ RideStatus } />
    <Route path='/lookup/ridetype' component={ RideType } />
    <Route path='/lookup/employeetype' component={ EmployeeType } />
</Layout>;
