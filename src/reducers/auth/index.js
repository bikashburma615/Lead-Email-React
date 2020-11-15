import {
	LOGIN_PENDING,
	LOGIN_REJECTED,
	LOGIN_FULFILLED,
	SIGNUP_PENDING,
	SIGNUP_REJECTED,
	SIGNUP_FULFILLED,
	SET_STATUS
} from '../../actions/auth';
import APP_CONSTANTS from '../../constant';

import { setRefreshToken, setAccessToken } from '../../services/token';

const INITIAL_STATE = {
	status: APP_CONSTANTS.STATUS.ONLINE
};

export default function (state = INITIAL_STATE, action) {
	switch(action.type) {
		case LOGIN_FULFILLED:
			setRefreshToken(action.payload.data.data.refreshToken);
			setAccessToken(action.payload.data.data.accessToken);
			return {...state, ...action.payload.data.data};

		case LOGIN_PENDING:
		case LOGIN_REJECTED:
			return state;

		case SIGNUP_FULFILLED:
		case SIGNUP_PENDING:
		case SIGNUP_REJECTED:
			return state;

		case SET_STATUS:
			return {...state, status: action.payload};

		default:
			return state;
	}
}