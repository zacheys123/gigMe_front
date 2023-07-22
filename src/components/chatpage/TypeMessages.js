//httpswww.youtube.com/watch?v=PqzlBRRCiaM
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
		<Box mt={2} w="100%">
			<FormControl isRequired onKeyDown={sendMessage} mb={5}>
				{isTyping ? (
					<div className="typing">
						<span></span>
						<span></span>
						<span></span>
					</div>
				) : (
					''
				)}
				<Input
					placeholder="Enter a message..."
					style={{ outline: 'none !important' }}
					borderRadius={'99px'}
					variant="filled"
					border=".1px solid lightgrey"
					value={new_message}
					onChange={typingHandler}
				/>
			</FormControl>
		</Box>
	);
};
export default TypeMessages;
