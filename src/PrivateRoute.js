import React from 'react';
import { connect } from 'react-redux';
import { Route, useHistory } from 'react-router-dom';
import { ASSIGN_LEAD_FULFILLED } from './actions/content';

import auth from './reducers/auth';
import { authorizationInterceptor } from './utils/interceptor';

const PrivateRoute = ({
	component: Component,
	path,
	auth: {
		accessToken,
		role
	},
	authorizedRoles,
	...rest
}) => {
	const history = useHistory();

	return <Route
		{...rest}
		render={props => {
			if (accessToken && role) {
				if (path === '/login' || path === '/signup') {
					if (role === 'admin') {
						history.push('/dashboard');
					} else if (role === 'user') {
						history.push('/');
					}
				} else if (authorizedRoles.some(authRole => authRole === role)) {
					return <Component {...props} />
				}
			} else {
				if (path === '/login' || path === '/signup') {
					return <Component {...props} />
				}
				history.push('/login');
			}
		}
		}
	/>
}

const mapStateToProps = state => {
	return { auth: state.auth }
}

export default connect(mapStateToProps, {})(PrivateRoute);