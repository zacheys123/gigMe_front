import React from 'react';
import { Box } from '@chakra-ui/react';
import { useMainContext } from '../../context/_context/UserContext';
import SingleChat from './SingleChat';
import { useMediaQuery } from '@chakra-ui/react';
const Chats = () => {
	const {
		userState: { selectedchat, fetchagain },
	} = useMainContext();
	const [isSmallScreen] = useMediaQuery('(max-width: 820px)');
	return (
		<Box
			style={{
				display: 'flex',
				width: isSmallScreen ? '100%' : '100%',
				flex: selectedchat && isSmallScreen ? '9' : '3',
			}}
			h="100%"
			alignItems="center"
			flexDir="column"
			p={3}
			bg="white"
			borderRadius="lg"
			borderWidth="1px"
		>
			<SingleChat />
		</Box>
	);
};

export default Chats;
