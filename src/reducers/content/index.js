import {
	GET_CONTENT_PENDING,
	GET_CONTENT_REJECTED,
	GET_CONTENT_FULFILLED,
	ASSIGN_LEAD_PENDING,
	ASSIGN_LEAD_REJECTED,
	ASSIGN_LEAD_FULFILLED,
	GET_ALL_CONTENTS_PENDING,
	GET_ALL_CONTENTS_REJECTED,
	GET_ALL_CONTENTS_FULFILLED,
	UPLOAD_CONTENT_PENDING,
	UPLOAD_CONTENT_REJECTED,
	UPLOAD_CONTENT_FULFILLED,
	CLEAR_CONTENT
} from '../../actions/content';

const INITIAL_STATE = { activeContent: { id: null, body: null }, allContents: [] }

export default function (state = INITIAL_STATE, action) {
	switch (action.type) {
		case GET_CONTENT_FULFILLED:
			return { ...state, activeContent: { ...action.payload.data.data } };

		case GET_CONTENT_PENDING:
		case GET_CONTENT_REJECTED:
			return state;

		case ASSIGN_LEAD_FULFILLED:
			if(action.payload.isAdmin) {
				const allContents = [...state.allContents.map(content=>({...content}))];
				allContents.forEach(content=>{
					if(content.id === action.payload.contentId) {
						content.actionType = action.payload.lead.actionType;
					}
				})
				return {...state, allContents}
			} else {
				return state;
			}
		case ASSIGN_LEAD_PENDING:
		case ASSIGN_LEAD_REJECTED:
			return state;

		case GET_ALL_CONTENTS_FULFILLED:
			return { ...state, allContents: [...action.payload.data.contents] };

		case GET_ALL_CONTENTS_PENDING:
		case GET_ALL_CONTENTS_REJECTED:
			return state;

		case UPLOAD_CONTENT_PENDING:
		case UPLOAD_CONTENT_REJECTED:
		case UPLOAD_CONTENT_FULFILLED:
			return state;

		case CLEAR_CONTENT:
			return INITIAL_STATE;

		default:
			return state;
	}
}


