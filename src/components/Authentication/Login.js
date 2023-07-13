import React, {
	useCallback,
	useState,
	useRef,
	useEffect,
} from 'react';
import {
	FormLabel,
	Input,
	Button,
	FormControl,
	CircularProgress,
} from '@chakra-ui/react';
import { useAuthContext } from '../../context/_context/AuthContext';
import { changeButton } from './util';
import { loginSlice } from '../../context/features/auth';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
const Login = () => {
	const toast = useToast();
	const nav = useNavigate();
	const { authDispatch } = useAuthContext();
	const [ispass, setPass] = useState(true);
	const [text, setText] = useState('show');
	const [loading, setLoading] = useState(false);
	const [user, setUser] = useState({ email: '', password: '' });
	const loginRef = useRef();
	const changeButton = (ev) => {
		console.log(ev);
		setPass((prev) => !prev);
		if (ispass) {
			setText('hide');
		} else {
			setText('show');
		}
	};
	const handleInput = (ev) => {
		setUser({ ...user, [ev.target.name]: ev.target.value });
	};
	const login = useCallback((ev) => {
		ev.preventDefault();
		loginSlice(loginRef, authDispatch, toast, nav, setLoading);
	}, []);
	useEffect(() => {
		loginRef.current = user;
	}, [user]);
	return (
		<div>
			<FormControl id="email" isRequired>
				<FormLabel>Email address</FormLabel>
				<Input
					w="70%"
					type="email"
					onChange={handleInput}
					value={user?.email}
					name="email"
				/>{' '}
				<FormLabel>Password</FormLabel>
			</FormControl>
			<FormControl id="password" isRequired>
				<Input
					w="70%"
					type={ispass ? 'password' : 'text'}
					onChange={handleInput}
					value={user?.password}
					name="password"
				/>
				<Button ml="1rem" fontFamily="cursive" onClick={changeButton}>
					{text}
				</Button>
			</FormControl>

			<br />
			<Button
				colorScheme="yellow"
				variant="solid"
				color="black"
				bg="lightgreen"
				p={3}
				m="3"
				textAlign="center"
				w="100%"
				onClick={login}
			>
				{!loading ? (
					'Login'
				) : (
					<CircularProgress
						isIndeterminate
						color="red.300"
						size="30px"
						thickness="9px"
					/>
				)}
			</Button>
		</div>
	);
};

export default Login;
