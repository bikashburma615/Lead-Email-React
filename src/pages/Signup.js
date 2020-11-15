import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
	Form,
	Button,
	Card
} from 'react-bootstrap';

import CustomAlert from '../components/Alert';
import Loader from '../components/Loader';

import { signup } from '../actions/auth';

const Signup = ({ signup }) => {
	const [formData, setFormData] = useState({ email: '', password: '', role: 'user' });
	const [isLoading, setLoading] = useState(false);
	const [alert, setAlert] = useState({ type: '', message: '' });

	const history = useHistory();

	const onTextChange = (e) => {
		const name = e.target.name;

		setFormData({ ...formData, [name]: e.target.value });
	}

	const setRole = (e) => {
		if (e.target.checked) {
			setFormData({ ...formData, role: 'admin' });
		} else {
			setFormData({ ...formData, role: 'user' });
		}
	}

	const onSubmit = async (e) => {
		e.preventDefault();

		try {
			setLoading(true);

			await signup(formData.email, formData.password, formData.role);
			history.push('/login');
			setLoading(false);
		} catch (err) {
			const message = err?.response?.data?.error?.message || 'Something went wrong!';
			setLoading(false);
			setAlert({ ...alert, type: 'danger', message });

			setTimeout(() => setAlert({ type: '', message: '' }), 5000);
		}
	}

	return <React.Fragment>
		<Card style={{ width: '50%', margin: 'auto', marginTop: '60px' }}>
			{isLoading && <Loader />}
			<Card.Title class="text-center">SIGN UP</Card.Title>
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
					<Form.Check
						id="is-admin"
						label="Admin"
						checked={formData.role === 'admin' ? true : false}
						onChange={setRole}
					/>
					<Button variant="primary" type="submit">
						Signup
  				</Button>
				</Form>
			</Card.Body>
		</Card>
	</React.Fragment>
}

const mapStateToProps = state => {
	return {}
}

const mapDispatchToProps = {
	signup
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);