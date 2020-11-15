import { createAction } from 'redux-actions';

import * as authService from '../../services/auth';

export const LOGIN = 'LOGIN';
export const LOGIN_PENDING = 'LOGIN_PENDING';
export const LOGIN_REJECTED = 'LOGIN_REJECTED';
export const LOGIN_FULFILLED = 'LOGIN_FULFILLED';

export const SIGNUP = 'SIGNUP';
export const SIGNUP_PENDING = 'SIGNUP_PENDING';
export const SIGNUP_REJECTED = 'SIGNUP_REJECTED';
export const SIGNUP_FULFILLED = 'SIGNUP_FULFILLED';

export const SET_STATUS = 'SET_STATUS';

export const login = createAction(
	LOGIN,
	authService.login
);

export const signup = createAction(
	SIGNUP,
	authService.signup
);

export const setStatus = createAction(
	SET_STATUS
);
