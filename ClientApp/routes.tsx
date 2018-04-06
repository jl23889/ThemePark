import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './components/Home';
import Rides from './components/Rides';
import Employees from './components/Employees';

import Lookup from './components/Lookup';
import Login from './components/Login';
import Register from './components/Register';


import Counter from './components/Counter';


export const routes =
<Layout>
    <Route exact path='/' component={ Home } />
    <Route path='/counter' component={ Counter } />
    <Route path='/rides' component={ Rides } />
    <Route path='/employees' component={ Employees } />    
    <Route path='/login' component={ Login } />
    <Route path='/register' component={ Register } />

    <Route path='/lookup/:tableToLoad?' component={ Lookup } />
</Layout>;
