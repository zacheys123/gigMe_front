const Endpoint = 'https://gigme-backend.onrender.com';
import { useEffect, useState } from 'react';
import TypeMessages from './TypeMessages';
import { useEffect, useState } from 'react';
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
import {
	getMessageSlice,
	sendMessageSlice,
} from '../../context/features/users';
import { useMainContext } from '../../context/_context/UserContext';
import { useAuthContext } from '../../context/_context/AuthContext';
import { Box, Spinner } from '@chakra-ui/react';

let socket, selectedChatCompare;
const Messages = (props) => {
	const [socketConnected, setSocket] = useState(false);
	const {
		userState: { selectedchat, messages, loading, new_message },
		userDispatch,
	} = useMainContext();
	const {
		authState: { user },
	} = useAuthContext();

	const toast = useToast();
	const sendMessage = () => {
		sendMessageSlice(
			user,
			socket,
			userDispatch,
			new_message,
			selectedchat,
			ev,
			messages,
			toast,
		);
	};

	const getAllMessages = () => {
		getMessageSlice(
			user,
			selectedchat,
			userDispatch,
			messages,
			socket,
		);
	};

	const typingHandler = (ev) => {
		userDispatch({
			type: NEWMESSAGE,
			payload: ev.target.value,
		});

		// typing indicator logic
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
		socket.on('connection', () => setSocket(true));

		socket.close();
	}, []);

	// create a copy of the current chat
	useEffect(() => {
		getAllMessages();
		props.fetch(getAllMessages);

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
	return (
		<>
			<Box
				style={{
					display: 'flex',
					flex: 9.5,

					flexDirection: 'column',
					justifyContent: 'flex-end',
					borderRadius: '20px',
					width: '100%',
					height: '100%',
				}}
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
			<TypeMessages
				sendMessage={sendMessage}
				typingHandler={typingHandler}
			/>
		</>
	);
};
export default Messages;
