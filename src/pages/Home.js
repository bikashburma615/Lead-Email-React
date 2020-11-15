import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
	Container,
	Row,
	Col,
	Button,
	Card,
	Modal
} from 'react-bootstrap';

import CustomAlert from '../components/Alert';
import Loader from '../components/Loader';

import { getContent, assignLead, clearContent } from '../actions/content';
import APP_CONSTANTS from '../constant';

const Home = ({
	getContent,
	content: {
		id,
		body
	},
	auth: {
		status
	},
	assignLead,
	clearContent
}) => {
	const [emailContent, setEmailContent] = useState(null);
	const [isLoading, setLoading] = useState(false);
	const [alert, setAlert] = useState({ type: '', message: '' });

	const [show, setShow] = useState(false);

	const handleClose = () => {
		if (timeout) {
			clearTimeout(timeout)
		}
		getEmail();
		setShow(false);
	}
	const handleShow = () => {
		setShow(true);
	};

	let timeout;

	useEffect(() => {
		if (timeout) {
			clearTimeout(timeout);
		}
		getEmail();
	}, [getContent, status]);

	useEffect(() => {
		if (id) {
			timeout = setTimeout(() => {
				releaseEmail()
			}, APP_CONSTANTS.SESSION_TIMEOUT)
		}
	}, [id])

	useEffect(async () => {
		if (status === APP_CONSTANTS.STATUS.AWAY) {
			if(timeout) {
				clearTimeout(timeout);
			}
			await onAssignLead(id, APP_CONSTANTS.ACTION_TYPE.RELEASE);
			await clearContent();
		}
	}, [status])

	useEffect(() => {
		if (body) {
			setEmailContent(createMarkup(body));
		}
	}, [body]);

	const getEmail = async () => {
		try {
			if (status === APP_CONSTANTS.STATUS.ONLINE) {
				setLoading(true);

				await getContent();

				setLoading(false);
			}
		} catch (err) {
			const message = err?.response?.data?.error?.message || 'Something went wrong!';
			setLoading(false);
			setAlert({ ...alert, type: 'danger', message });

			setTimeout(() => setAlert({ type: '', message: '' }), APP_CONSTANTS.ERROR_TIMEOUT);
		}
	}

	const releaseEmail = async () => {
		try {

			handleShow();
			if(id) {
				await assignLead(id, { actionType: APP_CONSTANTS.ACTION_TYPE.RELEASE });
			}
			await clearContent();

		} catch (err) {
			const message = err?.response?.data?.error?.message || 'Something went wrong!';
			setLoading(false);
			setAlert({ ...alert, type: 'danger', message });

			setTimeout(() => setAlert({ type: '', message: '' }), APP_CONSTANTS.ERROR_TIMEOUT);
		}
	}

	const onAssignLead = async (emailId, actionType) => {
		try {
			if (emailId) {
				setLoading(true);
				if (timeout) {
					clearTimeout(timeout);
				}
				await assignLead(emailId, { actionType });

				await getEmail();
				setLoading(false);
			}
		} catch (err) {
			const message = err?.response?.data?.error?.message || 'Something went wrong!';
			setLoading(false);
			setAlert({ ...alert, type: 'danger', message });

			setTimeout(() => setAlert({ type: '', message: '' }), APP_CONSTANTS.ERROR_TIMEOUT);
		}
	}

	const createMarkup = (body) => {
		return { __html: body }
	}

	return <React.Fragment>
		<Container className="mt-5">
			{isLoading && <Loader />}
			<Row>
				<Col>
					{alert?.message ? <CustomAlert variant={alert.type} message={alert.message} /> : ''}
					<div className="button-group-container">
						<Button
							variant="primary"
							disabled={status === APP_CONSTANTS.STATUS.AWAY}
							onClick={() => onAssignLead(id, APP_CONSTANTS.ACTION_TYPE.POSITIVE)}>
							Positive Reply
							</Button>
						<Button
							variant="primary"
							disabled={status === APP_CONSTANTS.STATUS.AWAY}
							onClick={() => onAssignLead(id, APP_CONSTANTS.ACTION_TYPE.NEUTRAL)}>
							Neutral Reply
							</Button>
						<Button
							variant="primary"
							disabled={status === APP_CONSTANTS.STATUS.AWAY}
							onClick={() => onAssignLead(id, APP_CONSTANTS.ACTION_TYPE.NOT_A_LEAD)}>
							Not a Lead
							</Button>
					</div>
				</Col>
			</Row>
			<Row className="mt-4">
				<Col>
					<Card>
						<Card.Body>
							{emailContent && <div dangerouslySetInnerHTML={emailContent}>
							</div>}
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Session Expired</Modal.Title>
			</Modal.Header>
			<Modal.Body>Click on the button below to resume your session.</Modal.Body>
			<Modal.Footer>
				<Button variant="primary" onClick={handleClose}>
					Resume
          </Button>
			</Modal.Footer>
		</Modal>
	</React.Fragment>
}

const mapStateToProps = state => {
	return {
		content: state.content.activeContent,
		auth: state.auth
	}
}

const mapDispatchToProps = {
	getContent,
	assignLead,
	clearContent
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);