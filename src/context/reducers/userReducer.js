import {
	APPEND,
	CREATECHAT,
	FETCHUSERSCHATS,
	SEARCHED_DATA,
	UPDATECHATS,
	FETCHAGAIN,
	UPDATE,
	UPDATEALLCHATS,
	FETCHMESSAGES,
	NEWMESSAGE,
	MESSAGES,
	LOADING,
	SETNOTIFICATIONS,
	FETCHMESSAGESAGAIN,
} from '../types/users';

export const userstate = {
	search_chats: [],
	chats: [],
	selectedchat: '',
	fetchagain: false,
	messages: [],
	loading: false,
	new_message: '',
	notifications: [],
	fetchMessages: false,
};
export const userReducer = (state = userstate, action) => {
	const newdata = [...state.chats, action.payload];
	const alldata = [action.payload, ...state.chats];
	switch (action.type) {
		case SEARCHED_DATA:
			return {
				...state,
				search_chats: action.payload,
			};
		case CREATECHAT:
			return {
				...state,
				selectedchat: action.payload,
			};
		case FETCHUSERSCHATS:
			return {
				...state,
				chats: action.payload,
			};
		case APPEND:
			return {
				...state,
				chats: newdata,
			};
		case UPDATECHATS:
			return {
				...state,
				chats: alldata,
			};
		case FETCHAGAIN:
			return {
				...state,
				fetchagain: true,
			};
		case UPDATE:
			return {
				...state,
				chats: action.payload.chats,
				selectedchat: action.payload.selected,
			};
		case UPDATEALLCHATS:
			return {
				...state,
				chats: alldata,
				selectedchat: action.payload.selected,
			};
		case NEWMESSAGE:
			return {
				...state,
				new_message: action.payload,
			};
		case FETCHMESSAGES:
			return {
				...state,
				chats: alldata,
				selectedchat: action.payload.selected,
			};
		case FETCHMESSAGESAGAIN:
			return {
				...state,
				fetchMessages: true,
			};
		case MESSAGES:
			return {
				...state,
				messages: action.payload,
			};
		case LOADING:
			return {
				...state,
				loading: !state.loading,
			};
		case SETNOTIFICATIONS:
			return {
				...state,
				notifications: action.payload,
			};
	}

	return {
		...state,
	};
};
