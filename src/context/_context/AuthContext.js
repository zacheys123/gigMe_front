import React, { useContext, useReducer } from 'react';
import { authProvider } from '../config';
import { authReducer, initialState } from '../reducers/authReducer';
const AuthContext = ({ children }) => {
	const [authState, authDispatch] = useReducer(
		authReducer,
		initialState,
	);

	let value = { authState, authDispatch };
	return (
		<authProvider.Provider value={value}>
			{children}
		</authProvider.Provider>
	);
};

export const useAuthContext = () => {
	const context = useContext(authProvider);
	if (!context) {
		throw new Error('UseMainContext can only be used in children');
	}
	return context;
};

export default AuthContext;
