import { createAction } from 'redux-actions';

import * as contentService from '../../services/content';

export const GET_CONTENT = 'GET_CONTENT';
export const GET_CONTENT_PENDING = 'GET_CONTENT_PENDING';
export const GET_CONTENT_REJECTED = 'GET_CONTENT_REJECTED';
export const GET_CONTENT_FULFILLED = 'GET_CONTENT_FULFILLED';

export const ASSIGN_LEAD = 'ASSIGN_LEAD';
export const ASSIGN_LEAD_PENDING = 'ASSIGN_LEAD_PENDING';
export const ASSIGN_LEAD_REJECTED = 'ASSIGN_LEAD_REJECTED';
export const ASSIGN_LEAD_FULFILLED = 'ASSIGN_LEAD_FULFILLED';

export const GET_ALL_CONTENTS = 'GET_ALL_CONTENTS';
export const GET_ALL_CONTENTS_PENDING = 'GET_ALL_CONTENTS_PENDING';
export const GET_ALL_CONTENTS_REJECTED = 'GET_ALL_CONTENTS_REJECTED';
export const GET_ALL_CONTENTS_FULFILLED = 'GET_ALL_CONTENTS_FULFILLED';

export const UPLOAD_CONTENT = 'UPLOAD_CONTENT';
export const UPLOAD_CONTENT_PENDING = 'UPLOAD_CONTENT_PENDING';
export const UPLOAD_CONTENT_REJECTED = 'UPLOAD_CONTENT_REJECTED';
export const UPLOAD_CONTENT_FULFILLED = 'UPLOAD_CONTENT_FULFILLED';

export const CLEAR_CONTENT = 'CLEAR_CONTENT';

export const getContent = createAction(
	GET_CONTENT,
	contentService.getContent
);

export const assignLead = createAction(
	ASSIGN_LEAD,
	contentService.assignLead
);

export const getAllContents = createAction(
	GET_ALL_CONTENTS,
	contentService.getAllContents
);

export const uploadContent = createAction(
	UPLOAD_CONTENT,
	contentService.uploadContent
);

export const clearContent = createAction(
	CLEAR_CONTENT
);