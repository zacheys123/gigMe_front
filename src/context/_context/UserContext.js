import React, { useContext, useReducer } from 'react';
import { userProvider } from '../config';
import { userReducer, userstate } from '../reducers/userReducer';
const UserContext = ({ children }) => {
	const [userState, userDispatch] = useReducer(
		userReducer,
		userstate,
	);

	let value = { userState, userDispatch };
	return (
		<userProvider.Provider value={value}>
			{children}
		</userProvider.Provider>
	);
};

export const useMainContext = () => {
	const context = useContext(userProvider);
	if (!context) {
		throw new Error('UseMainContext can only be used in children');
	}
	return context;
};

export default UserContext;
