import React from 'react';
import { Box } from '@chakra-ui/react';
import { useMainContext } from '../../context/_context/UserContext';
import SingleChat from './SingleChat';
const Chats = () => {
	const {
		userState: { selectedchat, fetchagain },
	} = useMainContext();

	return (
		<Box
			sx={{
				// display: selectedchat ? 'flex' : 'none',
				// md: 'flex',
				width: { base: '100%', md: '68%' },
			}}
			h="100%"
			alignItems="center"
			flexDir="column"
			p={3}
			bg="white"
			w={{ base: '100%', md: '68%' }}
			borderRadius="lg"
			borderWidth="1px"
		>
			<SingleChat />
		</Box>
	);
};

export default Chats;
