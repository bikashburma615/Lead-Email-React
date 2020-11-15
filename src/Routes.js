import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';

import PrivateRoute from './PrivateRoute';

import APP_CONSTANTS from './constant';

const Routes = () => {
	return <React.Fragment>
		<Container fluid>
			<Switch>
				<PrivateRoute exact path='/login' component={Login} authorizedRoles={[]}/>
				<PrivateRoute exact path='/signup' component={Signup} authorizedRoles={[]}/>
				<PrivateRoute exact path='/' component={Home} authorizedRoles={['user']}/>
				<PrivateRoute exact path='/dashboard' component={Dashboard} authorizedRoles={['admin']}/>
			</Switch>
		</Container>
	</React.Fragment>
}

export default Routes;