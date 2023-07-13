import { useState } from 'react';
import { Box } from '@chakra-ui/react';
import Messages from './Messages';
import TypeMessages from './TypeMessages';
import Header from './Header';
const ChatPage = () => {
	return (
		<Box
			style={{
				display: 'flex',
				flexDirection: 'column',
				minHeight: '100%',
			}}
			w="100%"
		></Box>
	);
};
export default ChatPage;
