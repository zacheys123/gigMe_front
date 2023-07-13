import {
	ASSIGNUSER,
	GETUSERS,
	LOGIN,
	LOGIN_ERROR,
	REGISTER,
	REGISTER_ERROR,
} from '../types/auth';
import { SEARCHED_DATA } from '../types/users';

export const initialState = {
	users: [],
	user: '',
	errormessage: '',
	error: false,
	success: false,
	successmessage: '',
};
export const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOGIN:
			return {
				...state,
				error: false,
				errormessage: '',
				success: true,
				successMessage: action.payload,
			};
		case LOGIN_ERROR:
			return {
				...state,
				error: true,
				success: false,
				errormessage: action.payload,
				successMessage: '',
			};
		case REGISTER:
			return {
				...state,
				error: false,
				errormessage: '',
				success: true,
				successMessage: action.payload,
			};
		case REGISTER_ERROR:
			return {
				...state,
				error: true,
				success: false,
				errormessage: action.payload,
				successMessage: '',
			};
		case ASSIGNUSER:
			return {
				...state,
				user: action.payload,
			};
	}
	return {
		...state,
	};
};
