import axios from 'axios';
import {
	LOGIN,
	LOGIN_ERROR,
	REGISTER,
	REGISTER_ERROR,
} from '../types/auth';
const baseUrl = 'http://localhost:3500';
export const getUsers = async (searchvalue, dispatch, setLoading) => {
	setLoading(true);
	try {
		setLoading(false);
		let userdata = await axios.get(
			`${baseUrl}/api/user?search={searchvalue}`,
		);
		dispatch({ type: 'GETUSERS', payload: userdata });
	} catch (error) {
		setLoading(true);
		console.log(error.message);
	}
};

export const loginSlice = async (
	user,
	dispatch,
	toast,
	nav,
	setLoading,
) => {
	console.log(user?.current);
	setLoading(true);
	try {
		let loginData = await axios.post(
			`${baseUrl}/api/auth/login`,
			user?.current,
		);
		setTimeout(() => {
			setLoading(false);
			toast({
				title: loginData?.data?.message,
				status: 'success',
				duration: 3000,
				isClosable: true,
				position: 'top-left',
			});

			dispatch({ type: LOGIN, payload: loginData });
			setTimeout(() => {
				setLoading(false);
				nav('/chat');
				localStorage.setItem(
					'profile',
					JSON.stringify(loginData?.data),
				);
			}, 3000);
		}, 4000);
	} catch (error) {
		setLoading(false);
		toast({
			title: error?.response?.data?.message,

			status: 'warning',
			duration: 3000,
			isClosable: true,
			position: 'center',
		});
		dispatch({
			type: LOGIN_ERROR,
			payload: error?.response.data.message,
		});
		console.log(error);
	}
};
export const registerSlice = async (
	user,
	dispatch,
	toast,
	nav,
	setLoading,
) => {
	try {
		setLoading(true);
		let registerData = await axios.post(
			`${baseUrl}/api/auth/register`,
			user?.current,
		);

		setTimeout(() => {
			setLoading(false);
			toast({
				title: registerData?.data?.message,

				status: 'success',
				duration: 3000,
				isClosable: true,
				position: 'center',
			});
			dispatch({ type: REGISTER, payload: registerData });
			console.log(registerData?.data);
			setTimeout(() => {
				setLoading(true);
				nav('/chat');
				localStorage.setItem(
					'profile',
					JSON.stringify(registerData?.data),
				);
			}, 3000);
		}, 4000);
	} catch (error) {
		toast({
			title: error?.response?.data?.message,

			status: 'warning',
			duration: 3000,
			isClosable: true,
		});
		setLoading(false);
		dispatch({
			type: REGISTER_ERROR,
			payload: error?.response?.data?.message,
		});
	}
};
