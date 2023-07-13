import { createContext } from 'react';
import { initialState } from './reducers/authReducer';
import { userstate } from './reducers/userReducer';
export const authProvider = createContext(initialState);
export const userProvider = createContext(userstate);
