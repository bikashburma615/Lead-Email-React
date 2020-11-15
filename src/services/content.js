import { http } from '../utils/http';

export const getContent = async () => {
	const url = '/contents/available';
	const response = await http.get(url);

	return response;
}

export const assignLead = async (contentId, lead, isAdmin) => {
	const url = `/contents/${contentId}`;
	const response = await http.put(url , lead);

	return {isAdmin, contentId, lead};
}

export const getAllContents = async () => {
	const url = '/contents';
	const response = await http.get(url);

	return response;
}

export const uploadContent = async (data) => {
	const url = '/contents/upload';
	const response = await http.post(url, data);

	return response;
}