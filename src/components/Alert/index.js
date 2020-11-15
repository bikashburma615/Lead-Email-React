import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';

const CustomAlert = ({
	variant,
	message
}) => {
	const [show, setShow] = useState(true);

	return <React.Fragment>
		{show && <Alert variant={variant} onClose={() => setShow(false)} dismissable="true" transition={true}>
			{ message }
		</Alert>}
	</React.Fragment>
}

export default CustomAlert;