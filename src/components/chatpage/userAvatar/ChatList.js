import { Box } from '@chakra-ui/react';
import React from 'react';

const ChatList = ({ chat }) => {
	return <Box>{chat?.chatName}</Box>;
};

export default ChatList;
