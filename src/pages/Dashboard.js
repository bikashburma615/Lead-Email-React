import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import {
	Card,
	Row,
	Col,
	Button,
	Container
} from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import Select from 'react-select';

import CustomAlert from '../components/Alert';
import Loader from '../components/Loader';

import { getAllContents, assignLead, uploadContent } from '../actions/content';
import APP_CONSTANTS from '../constant';

const Dashboard = ({ getAllContents, contents, assignLead, uploadContent }) => {
	const [isLoading, setLoading] = useState(false);
	const [alert, setAlert] = useState({ type: '', message: '' });

	const options = [
		{ value: APP_CONSTANTS.ACTION_TYPE.POSITIVE, label: 'Positive Reply' },
		{ value: APP_CONSTANTS.ACTION_TYPE.NEGATIVE, label: 'Negative Reply' },
		{ value: APP_CONSTANTS.ACTION_TYPE.NOT_A_LEAD, label: 'Not a lead' },
		{ value: APP_CONSTANTS.ACTION_TYPE.ON_HOLD, label: 'In Progress' },
		{ value: APP_CONSTANTS.ACTION_TYPE.RELEASE, label: 'Not Processed' }
	]

	const columns = [
		{
			dataField: 'id',
			text: 'ID',
			hidden: true
		},
		{
			dataField: 'body',
			text: 'Email'
		},
		{
			dataField: 'id',
			text: 'Actions',
			formatter: (cell, row) => {
				return <Select
					options={options}
					value={options.filter(option => option.value === row.actionType)[0]}
					onChange={(selectedOption) => updateLead(row.id, selectedOption)}
				/>
			},
			style: {
				minWidth: '200px'
			}
		}
	]

	useEffect(() => {
		getAllEmails();
	}, [getAllContents])

	const getAllEmails = async () => {
		try {
			setLoading(true);

			await getAllContents();

			setLoading(false);
		} catch (err) {
			const message = err?.response?.data?.error?.message || 'Something went wrong!';
			setLoading(false);
			setAlert({ ...alert, type: 'danger', message });

			setTimeout(() => setAlert({ type: '', message: '' }), APP_CONSTANTS.ERROR_TIMEOUT);
		}
	}

	const updateLead = async (id, selectedOption) => {
		try {
			setLoading(true);

			await assignLead(id, { actionType: selectedOption.value }, true);

			setLoading(false);
		} catch (err) {
			const message = err?.response?.data?.error?.message || 'Something went wrong!';
			setLoading(false);
			setAlert({ ...alert, type: 'danger', message });

			setTimeout(() => setAlert({ type: '', message: '' }), APP_CONSTANTS.ERROR_TIMEOUT);
		}
	}

	const {
		acceptedFiles,
		getRootProps,
		getInputProps
	} = useDropzone({
		accept: '.xlsx',
		maxFiles: 1
	});

	const acceptedFileItems = acceptedFiles.map(file => (
		<li key={file.path}>
			{file.path} - {file.size} bytes
		</li>
	));

	const uploadFile = async (file) => {

		const formData = new FormData();

		formData.append('file', acceptedFiles[0]);

		try {
			setLoading(true);

			await uploadContent(formData);

			setLoading(false);
		} catch (err) {
			const message = err?.response?.data?.error?.message || 'Something went wrong!';
			setLoading(false);
			setAlert({ ...alert, type: 'danger', message });

			setTimeout(() => setAlert({ type: '', message: '' }), APP_CONSTANTS.ERROR_TIMEOUT);
		}
	}

	return <React.Fragment>
		<Container className="mt-5">
			{isLoading && <Loader />}
			<Row>
				<Col className="mb-3">
					<Card>
						<Card.Title>Upload File</Card.Title>
						<Card.Body>
							<section className="container">
								<div {...getRootProps({ className: 'dropzone' })}>
									<input {...getInputProps()} />
									<p>Drag 'n' drop some files here, or click to select files</p>
									<em>(Only *.xlsx files will be accepted)</em>
									<ul>{acceptedFileItems}</ul>
								</div>
							</section>
							<Button variant="primary" type="button" onClick={uploadFile}>
								Upload
  		</Button>
						</Card.Body>
					</Card>
				</Col>
			</Row>
			<Row>
				<Col>
					{alert?.message ? <CustomAlert variant={alert.type} message={alert.message} /> : ''}
					<BootstrapTable keyField='id' data={contents} columns={columns} />
				</Col>
			</Row>
		</Container>
	</React.Fragment>
}

const mapStateToProps = state => {
	return {
		contents: state.content.allContents
	}
}

const mapDispatchToProps = {
	getAllContents,
	assignLead,
	uploadContent
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);