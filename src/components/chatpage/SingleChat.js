import React, { useEffect, useState } from 'react';

import { Box, Text, IconButton, Spinner } from '@chakra-ui/react';
import { ArrowBackIcon, ViewIcon } from '@chakra-ui/icons';
import { CREATECHAT } from '../../context/types/users';
import { useMainContext } from '../../context/_context/UserContext';
import { useAuthContext } from '../../context/_context/AuthContext';
import NewChat from './userAvatar/NewChat';
import UpdateGroup from './UpdateGroup';
import { getSenderFull } from './config/chatLogics';
import ProfileModal from './ProfileModal';

import TypeMessages from './TypeMessages';

import { useToast } from '@chakra-ui/react';
import {
	LOADING,
	MESSAGES,
	NEWMESSAGE,
} from '../../context/types/users';
import axios from 'axios';
import './style.css';
import ScrollableChat from './ScrollableChat';
import { io } from 'socket.io-client';
const Endpoint = 'http://localhost:3500';
let socket, selectedChatCompare;
const SingleChat = () => {
	const [socketConnected, setSocket] = useState(false);
	const {
		userState: { selectedchat, messages, loading, new_message },
		userDispatch,
	} = useMainContext();
	const {
		authState: { user },
	} = useAuthContext();

	const [typing, setTyping] = useState(false);
	const [isTyping, setIsTyping] = useState(false);
	const toast = useToast();
	const sendMessage = async (ev) => {
		socket.emit('stop typing', selectedchat._id);
		if (ev.key === 'Enter' && new_message) {
			try {
				const config = {
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${user.token}`,
					},
				};
				userDispatch({
					type: NEWMESSAGE,
					payload: '',
				});
				const { data } = await axios.post(
					'http://localhost:3500/api/message',
					{ content: new_message, chatId: selectedchat?._id },
					config,
				);

				console.log(data);
				socket.emit('new message', data);
				userDispatch({
					type: MESSAGES,
					payload: [...messages, data],
				});
			} catch (error) {
				toast({
					title: error?.response?.data?.message,
					description: 'Failed to Update Messages',
					duration: 3000,
					isClosable: true,
					position: 'top',
				});
			}
		}
	};

	const getAllMessages = async () => {
		if (!selectedchat) return;

		try {
			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${user.token}`,
				},
			};
			const id = selectedchat?._id;
			userDispatch({ type: LOADING });
			const { data } = await axios.get(
				`http://localhost:3500/api/message/${id}`,
				config,
			);

			console.log(messages);
			userDispatch({ type: MESSAGES, payload: data });
			userDispatch({ type: LOADING });
			socket.emit('join chat', selectedchat?._id);
		} catch (error) {
			console.log(error.message);
		}
	};

	var connectionOptions = {
		'force new connection': true,
		reconnectionAttempts: 'Infinity',
		timeout: 10000,
		transports: ['websocket'],
	};
	// socket connection and setting up a connection to the rooms
	useEffect(() => {
		socket = io(Endpoint, connectionOptions);
		if (socket === null) return;
		socket.emit('addNewUser', user);
		socket.on('connected', () => setSocket(true));
		socket.on('typing', () => setIsTyping(true));
		socket.on('stop typing', () => setIsTyping(false));
		return () => {
			if (socket.readyState === 1) {
				// <-- This is important
				socket.close();
			}
		};
	}, []);

	// create a copy of the current chat
	useEffect(() => {
		getAllMessages();
		selectedChatCompare = selectedchat;
	}, [selectedchat]);

	useEffect(() => {
		socket.on('message recieved', (newmessage) => {
			if (
				!selectedChatCompare ||
				selectedChatCompare._id !== newmessage?.chat?._id
			) {
				// give note
			} else {
				userDispatch({
					type: MESSAGES,
					payload: [...messages, newmessage],
				});
			}
		});
	});

	const typingHandler = (ev) => {
		userDispatch({
			type: NEWMESSAGE,
			payload: ev.target.value,
		});

		if (!socketConnected) return;

		if (!typing) {
			setTyping(true);
			socket.emit('typing', selectedchat._id);
		}

		let lastTypingTime = new Date().getTime();
		let timer = 3000;
		setTimeout(() => {
			let timenow = new Date().getTime();
			let timeDiff = timenow - lastTypingTime;
			if (timeDiff >= timer && typing) {
				socket.emit('stop typing', selectedchat._id);
				setTyping(false);
			}
		}, timer);
	};
	return (
		<>
			{selectedchat ? (
				<Box w="100%" h="86%" d="flex" justifyContent="column">
					<Box flex=".6" h="100%">
						<Box
							fontSize={{ base: '28px', md: '18px' }}
							pb={3}
							px={2}
							w="100%"
							fontFamily="cursive"
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
							}}
						>
							<IconButton
								d={{ base: 'none', md: 'none' }}
								icon={<ArrowBackIcon />}
								onClick={() =>
									userDispatch({ type: CREATECHAT, payload: '' })
								}
							/>

							{!selectedchat.isGroupChat ? (
								<>
									{selectedchat?.users[0]._id === user?.result?._id
										? selectedchat?.users[1].name
										: selectedchat?.users[0].name}
									<ProfileModal
										user={getSenderFull(user, selectedchat?.users)}
									/>
								</>
							) : (
								<>
									{selectedchat.chatName.toUpperCase()}

									<UpdateGroup fetchMessages={getAllMessages} />
								</>
							)}
						</Box>

						<Box
							style={{
								display: 'flex',
								overflowY: 'hidden',
								flexDirection: 'column',
								justifyContent: 'flex-end',
								borderRadius: '20px',
								width: '100%',
								height: '100%',
							}}
							h="100%"
							className="chatpage"
						>
							{loading ? (
								<Spinner
									color="white"
									size="xl"
									w={20}
									h={20}
									alignSelf="center"
									margin="auto"
								/>
							) : (
								<div className="messages">
									{<ScrollableChat messages={messages} />}
								</div>
							)}
						</Box>
					</Box>
					<Box>
						<TypeMessages
							isTyping={isTyping}
							sendMessage={sendMessage}
							typingHandler={typingHandler}
						/>
					</Box>
				</Box>
			) : (
				<>
					<Box
						style={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
						}}
						w="100%"
						h="100%"
					>
						{' '}
						<Text fontSize="3xl">
							Click On a User To Start A Chat
						</Text>
					</Box>
				</>
			)}
		</>
	);
};

export default SingleChat;
