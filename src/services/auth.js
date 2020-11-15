import { http, refreshTokenHttp } from '../utils/http';

export const refresh = async (refreshToken) => {
	const url = '/auth/access-token';
	const { data } = await refreshTokenHttp.post(url, { refreshToken });

	return data;
}

export const login = async (email, password) => {
	const url = `/auth/login`;
	const response = await http.post(url, { username: email, password });

	return response;
}

export const signup = async (email, password, role) => {
	const url = `/users`;
	const response = await http.post(url, { username: email, password, role });

	return response;
}