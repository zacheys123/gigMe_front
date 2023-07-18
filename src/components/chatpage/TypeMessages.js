import {
	Box,
	Input,
	FormControl,
	InputGroup,
	Button,
} from '@chakra-ui/react';

import { useMainContext } from '../../context/_context/UserContext';
import { useAuthContext } from '../../context/_context/AuthContext';
import { useState } from 'react';
import { NEWMESSAGE } from '../../context/types/users';
import animationData from '../../animations/typing.json';
import Lottie from 'react-lottie';
const TypeMessages = ({ isTyping, sendMessage, typingHandler }) => {
	const {
		userState: { selectedchat, messages, loading, new_message },
		userDispatch,
	} = useMainContext();
	const defaultoptions = {
		loop: true,
		autoplay: true,
		animationData: animationData,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice',
		},
	};
	return (
		<Box mt={5} w="100%">
			<FormControl isRequired onKeyDown={sendMessage}>
				{isTyping ? (
					<Lottie
						w="10px"
						style={{ marginLeft: '15px', marginRight: '15px' }}
						options={defaultoptions}
					/>
				) : (
					''
				)}
				<Input
					placeholder="Enter a message..."
					style={{ outline: 'none !important' }}
					borderRadius={'99px'}
					variant="filled"
					bg="#F1E9B0"
					value={new_message}
					onChange={typingHandler}
				/>
			</FormControl>
		</Box>
	);
};
export default TypeMessages;
