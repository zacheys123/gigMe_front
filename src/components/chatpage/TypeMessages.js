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

const TypeMessages = ({ isTyping, sendMessage, typingHandler }) => {
	const {
		userState: { selectedchat, messages, loading, new_message },
		userDispatch,
	} = useMainContext();

	return (
		<Box mt="3.6rem">
			<FormControl isRequired mt={3} onKeyDown={sendMessage}>
				{isTyping ? <div>loading</div> : ''}
				<Input
					placeholder="Write Something..."
					style={{ outline: 'none !important' }}
					borderRadius={'99px'}
					variant="filled"
					bg="#E0E0E0"
					value={new_message}
					onChange={typingHandler}
				/>
			</FormControl>
		</Box>
	);
};
export default TypeMessages;
