import React, {
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react';
import {
	FormControl,
	FormLabel,
	Input,
	Button,
	Box,
	VStack,
	CircularProgress,
} from '@chakra-ui/react';
import { registerSlice } from '../../context/features/auth';
import { useAuthContext } from '../../context/_context/AuthContext';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
const Register = () => {
	const toast = useToast();
	const nav = useNavigate();
	const {
		authState: { error, errormessage },
		authDispatch,
	} = useAuthContext();
	const [ispass, setPass] = useState(true);
	const [pic, setPic] = useState('');
	const [text, setText] = useState('show');
	const registerRef = useRef();
	const [loading, setLoading] = useState(false);
	const [user, setUser] = useState({
		name: '',
		email: '',
		password: '',
		confirmpassword: '',
		pic: pic,
	});
	const changeButton = (ev) => {
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
	// https://api.cloudinary.com/v1_1/dsziq73cb
	const postdata = (pics) => {
		setLoading(true);
		if (pics === 'undefined') {
			toast({
				title: 'Please Select an Image',

				status: 'warning',
				duration: 3000,
				isClosable: true,
				position: 'bottom',
			});
			return;
		}
		if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
			const data = new FormData();
			data.append('file', pics);
			data.append('upload_preset', 'mern-chat');

			fetch('https://api.cloudinary.com/v1_1/dsziq73cb', {
				method: 'post',
				body: data,
			})
				.then((res) => res.json())
				.then((data) => {
					setPic(data.url.toString());
					console.log(data.url.toString());
					setLoading(false);
				})
				.catch((error) => {
					console.log(error.message);
					setLoading(false);
				});
		} else {
			toast({
				title: "Invalid Imgae,check extension'jpeg or png'",

				status: 'warning',
				duration: 3000,
				isClosable: true,
				position: 'bottom',
			});
			setLoading(false);
			return;
		}
	};

	const register = useCallback(
		(ev) => {
			ev.preventDefault();
			registerSlice(
				registerRef,
				authDispatch,
				toast,
				nav,
				setLoading,
			);
		},
		[toast, authDispatch, nav],
	);
	useEffect(() => {
		registerRef.current = user;
	}, [user]);

	return (
		<VStack>
			<FormControl id="first-name" isRequired>
				<FormLabel>Name</FormLabel>
				<Input
					w="80%"
					type="text"
					onChange={handleInput}
					name="name"
					value={user?.name}
				/>{' '}
			</FormControl>
			<FormControl id="email" isRequired>
				<FormLabel>Email address</FormLabel>
				<Input
					w="80%"
					type="email"
					onChange={handleInput}
					name="email"
					value={user?.email}
				/>{' '}
			</FormControl>
			<FormControl id="password" isRequired>
				<FormLabel>Password</FormLabel>
				<Input
					w="80%"
					type={ispass ? 'password' : 'text'}
					onChange={handleInput}
					name="password"
					value={user?.password}
				/>
			</FormControl>
			<FormControl id="confirmpassword" isRequired>
				<FormLabel>Confirm Password</FormLabel>

				<Input
					w="80%"
					type={ispass ? 'password' : 'text'}
					onChange={handleInput}
					name="confirmpassword"
					value={user?.confirmpassword}
				/>
				<Button ml="1rem" fontFamily="cursive" onClick={changeButton}>
					{text}
				</Button>
			</FormControl>
			<FormControl id="picture" isRequired>
				<FormLabel id="picture">Upload picture</FormLabel>

				<Input
					w="80%"
					type="file"
					name="picture"
					onChange={(ev) => postdata(ev.target.files[0])}
				/>
			</FormControl>
			<br />
			<Button
				colorScheme="teal"
				variant="solid"
				p={3}
				m="3"
				textAlign="center"
				w="100%"
				bg="blue"
				color="white"
				onClick={register}
				isLoading={loading}
			>
				{!loading ? (
					'Sign Up'
				) : (
					<CircularProgress
						isIndeterminate
						color="red.300"
						size="30px"
						thickness="9px"
					/>
				)}
			</Button>
			<Button
				colorScheme="red"
				variant="Solid"
				p={3}
				m="3"
				fontFamily="sans"
				textAlign="center"
				w="100%"
				bg="red"
				color="white"
				onClick={() => {
					setUser((prev) => {
						return {
							...prev,
							email: 'guest@gmail.com',
							password: '12345678',
						};
					});
				}}
			>
				Get Guest User Credentials
			</Button>
		</VStack>
	);
};

export default Register;
