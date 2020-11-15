import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Navbar, NavDropdown } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import APP_CONSTANTS from '../constant';
import { setStatus } from '../actions/auth';

const Nav = ({
	auth: {
		role,
		status
	},
	setStatus
}) => {
	const history = useHistory();
	const [showNavbar, setNavbar] = useState(false);

	useEffect(()=>{
		if(role && status) {
			setNavbar(true);
		}
	}, [role, status])

	const changeStatus = (status) => {
		setStatus(status);
	}

	const logout = () => {
		localStorage.clear();

		history.push('/login');
	}
	return <React.Fragment>
		{showNavbar? <Navbar bg="light" expand="lg" className="justify-content-end">
			<span class={status === APP_CONSTANTS.STATUS.ONLINE ? 'status-icon online' : 'status-icon away'}></span>
			<NavDropdown title={status} class="text-capitalize">
				{role === 'user' && <NavDropdown.Item onClick={() => changeStatus(APP_CONSTANTS.STATUS.ONLINE)}>Set as Online</NavDropdown.Item>}
				{role === 'user' && <NavDropdown.Item onClick={() => changeStatus(APP_CONSTANTS.STATUS.AWAY)}>Set as Away</NavDropdown.Item>}
				<NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
			</NavDropdown>
		</Navbar> : ''}
	</React.Fragment>
}

const mapStateToProps = state => {
	return {
		auth: state.auth,
		content: state.content.activeContent
	}
}

const mapDispatchToProps = {
	setStatus
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);