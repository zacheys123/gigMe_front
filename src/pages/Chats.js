import { useEffect, useState } from 'react';
import { useAuthContext } from '../context/_context/AuthContext';
import { FormControl, Input, Box } from '@chakra-ui/react';
import { GETUSERS } from '../context/types/auth';
import axios from 'axios';
import SideDrawer from '../components/chatpage/SideDrawer';
import MyChats from '../components/chatpage/MyChats';
import ChatBox from '../components/chatpage/ChatBox';
import Logout from '../components/chatpage/Logout';
import { useMediaQuery } from '@chakra-ui/react';
const Chats = () => {
	const {
		authState: { user },
	} = useAuthContext();
	const [loading, setLoading] = useState(false);
	const [isSmallScreen] = useMediaQuery('(max-width: 820px)');
	return (
		<Box w="100%" bg={'lightgrey'} overflowY={'hidden'}>
			{user && (
				<SideDrawer loading={loading} setLoading={setLoading} />
			)}
			<Box
				d="flex"
				justifyContent="space-between"
				w="100%"
				h="91.5vh"
				p="10px"
				style={{ display: 'flex' }}
			>
				{!loading ? (
					<>
						{user && <MyChats />}
						{user && <ChatBox />}
					</>
				) : (
					<Logout />
				)}
			</Box>
		</Box>
	);
};

export default Chats;
