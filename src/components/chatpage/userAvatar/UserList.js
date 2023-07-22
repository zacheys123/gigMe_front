import { Avatar, Box, Text } from '@chakra-ui/react';
import React from 'react';
import { useMainContext } from '../../../context/_context/UserContext';

const UserList = ({ user, handleFunction, margint }) => {
	return (
		<Box
			onClick={handleFunction}
			cursor="pointer"
			bg={'#E8E8E8'}
			_hover={{ background: '#A3C9F9', color: 'white' }}
			w="100%"
			px=" 3"
			py="2"
			mt={margint || 2}
			style={{
				display: 'flex',
				alignItems: 'center',
				color: 'black',

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
				src={user?.pic}
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
