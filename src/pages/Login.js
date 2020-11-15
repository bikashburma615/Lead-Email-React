import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
	Form,
	Button,
	Card
} from 'react-bootstrap';

import CustomAlert from '../components/Alert';
import Loader from '../components/Loader';

import { login } from '../actions/auth';
import APP_CONSTANTS from '../constant';

const Login = ({
	login,
	auth: {
		role
	}
}) => {
	const [formData, setFormData] = useState({ email: '', password: '' });
	const [isLoading, setLoading] = useState(false);
	const [alert, setAlert] = useState({ type: '', message: '' });
	const history = useHistory();

	useEffect(() => {
		if(role === 'admin') {
			history.push('/dashboard');
		} else if (role === 'user') {
			history.push('/');
		}
	}, [role]);

	const onTextChange = (e) => {
		const name = e.target.name;

		setFormData({ ...formData, [name]: e.target.value });
	}

	const onSubmit = async (e) => {
		e.preventDefault();

		try {
			setLoading(true);

			await login(formData.email, formData.password);

			setLoading(false);
		} catch (err) {
			const message = err?.response?.data?.error?.message || 'Something went wrong!';
			setLoading(false);
			setAlert({ ...alert, type: 'danger', message });

			setTimeout(() => setAlert({ type: '', message: '' }), APP_CONSTANTS.ERROR_TIMEOUT);
		}
	}

	return <React.Fragment>
		<Card style={{ width: '50%', margin: 'auto', marginTop: '60px' }}>
			{isLoading && <Loader />}
			<Card.Title class="text-center">LOGIN</Card.Title>
			{alert?.message ? <CustomAlert variant={alert.type} message={alert.message} /> : ''}
			<Card.Body>
				<Form onSubmit={onSubmit}>
					<Form.Group>
						<Form.Label>Email address</Form.Label>
						<Form.Control
							name="email"
							type="email"
							placeholder="Enter email"
							onChange={onTextChange}
							value={formData.email} />
					</Form.Group>

					<Form.Group>
						<Form.Label>Password</Form.Label>
						<Form.Control
							name="password"
							type="password"
							placeholder="Password"
							onChange={onTextChange}
							value={formData.password} />
					</Form.Group>
					<Button variant="primary" type="submit">
						Login
  				</Button>
				</Form>
			</Card.Body>
		</Card>
	</React.Fragment>

}

const mapStateToProps = state => {
	return {
		auth: state.auth
	}
}

const mapDispatchToProps = {
	login
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);