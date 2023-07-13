import { Avatar, Box, Text } from '@chakra-ui/react';
import React from 'react';
import { useMainContext } from '../../../context/_context/UserContext';

const UserList = ({ user, handleFunction }) => {
	return (
		<Box
			onClick={handleFunction}
			cursor="pointer"
			bg={'#E8E8E8'}
			_hover={{ background: '#A3C9F9', color: 'white' }}
			w="100% "
			style={{
				display: 'flex',
				alignItems: 'center',
				color: 'black',
				px: 3,
				py: 2,
				mb: 2,
				borderRadius: '10px',
				background: '#8E8E8',
				marginBottom: '.7rem',
				padding: '.3rem',
			}}
		>
			<Avatar
				mr={2}
				size="sm"
				ml="2"
				cursor="pointer"
				name={user?.name}
			/>
			<Box>
				<Text>{user.name}</Text>
				<Text>
					<b>Email :</b>
					{user.email}
				</Text>
			</Box>
		</Box>
	);
};

export default UserList;
