import React from 'react';
import {
	Spinner
} from 'react-bootstrap';

const Loader = () => {

	return <React.Fragment>
		<div class="backdrop">
			<div class="spinner">
				<Spinner animation="border" variant="primary" />
			</div>
		</div>
	</React.Fragment>
}

export default Loader;