import React, { useState, useEffect } from 'react';
import {
	Container,
	Text,
	FormControl,
	FormLabel,
	Tab,
	Tabs,
	TabList,
	TabPanels,
	TabPanel,
	Input,
	Box,
	Button,
} from '@chakra-ui/react';
import Login from '../components/Authentication/Login';
import '../css/homes.css';
import { useNavigate } from 'react-router-dom';
import Register from '../components/Authentication/Register';
const Home = () => {
	let logincolor = 'aqua';
	let signupcolor = 'lightblue';

	const change = (ev) => {
		if (ev.target.innerText === 'Signup') {
			logincolor = 'teal';
			signupcolor = 'violet';
		} else if (ev.target.innerText === 'Login') {
			signupcolor = 'teal';
			logincolor = 'yellow';
		}
	};

	const nav = useNavigate();

	const id = JSON.parse(localStorage.getItem('profile'));
	useEffect(() => {
		if (id) {
			nav('/chats');
		}
	}, [id, nav]);

	return (
		<Container maxW="xl" centerContent className="home">
			<Box
				d="flex"
				justifyContent="center"
				p={3}
				bg={'white'}
				w="50%"
				m="4% 0 15px 0"
				borderRadius="lg"
				borderWidth="1px"
			>
				<Text
					fontSize="4xl"
					fontFamily="Work Sans"
					textAlign="center"
				>
					Fifa Talk
				</Text>
			</Box>
			<Box bg={'white'} w="53%" borderRadius="lg" borderWidth="1px">
				<Tabs>
					<TabList border="none">
						<Tab
							bg={signupcolor}
							m="1rem  1rem"
							borderRadius="20px"
							border="none"
							w="50%"
							onClick={change}
						>
							Signup
						</Tab>
						<Tab
							bg={logincolor}
							color="red"
							m="1rem  1rem"
							borderRadius="20px"
							border="none"
							w="50%"
							onClick={change}
						>
							Login
						</Tab>
					</TabList>

					<TabPanels>
						<TabPanel>
							<Register />
						</TabPanel>
						<TabPanel>
							<Login />
						</TabPanel>
					</TabPanels>
				</Tabs>
			</Box>
		</Container>
	);
};

export default Home;
