import React, { useEffect, useState } from 'react';
import { useMainContext } from '../../context/_context/UserContext';
import { useAuthContext } from '../../context/_context/AuthContext';
import {
	useToast,
	Box,
	Button,
	Stack,
	Text,
	Avatar,
} from '@chakra-ui/react';
import { fetchSlice } from '../../context/features/users';
import { AddIcon } from '@chakra-ui/icons';
import NewChat from './userAvatar/NewChat';
import ChatLoading from './ChatLoading';
import { CREATECHAT } from '../../context/types/users';
import { getSender } from './config/chatLogics';
import SearchModal from './SearchModal';

const MyChats = () => {
	const {
		userState: { chats, selectedchat, fetchagain },
		userDispatch,
	} = useMainContext();
	const {
		authState: { user },
	} = useAuthContext();
	const [showGroupPage, setNewGroup] = useState(false);
	const toast = useToast();
	const [loadingchats, setLoadingChats] = useState(false);
	const fetchChats = () => {
		fetchSlice(userDispatch, user, setLoadingChats);
	};

	useEffect(() => {
		fetchChats();
	}, [fetchagain]);

	return (
		<Box
			flexDir="column"
			alignItems="center"
			p={3}
			bg={'white'}
			w={{ base: '100%', md: '31%' }}
			borderRadius="lg"
			borderWidth="1px"
		>
			{!showGroupPage ? (
				<>
					<Box
						pb={3}
						px={3}
						fontSize={{ base: '28px', md: '30px' }}
						fontFamily="Work sans"
						d="flex"
						style={{ display: 'flex' }}
						w="100%"
						justifyContent="space-between"
						alignItems="center"
					>
						<Text
							fontSize={{ base: '17px', md: '18px', lg: '17px' }}
							fontWeight="bold"
						>
							My Chats
						</Text>
						<Button
							d="flex"
							fontSize={{ base: '17px', md: '10px', lg: '17px' }}
							rightIcon={<AddIcon />}
							onClick={() => setNewGroup((prev) => !prev)}
						>
							New Group Chat
						</Button>
					</Box>
					<Box
						style={{ display: 'flex' }}
						flexDir="column"
						p={3}
						bg="#F8F8F8"
						w="100%"
						h="100%"
						borderRadius="lg"
						overflowY="hidden"
					>
						{!loadingchats ? (
							<Stack overflowY="scroll">
								{chats
									? chats?.map((chat) => {
											return (
												<Box
													onClick={() =>
														userDispatch({
															type: CREATECHAT,
															payload: chat,
														})
													}
													cursor="pointer"
													bg={
														selectedchat === chat
															? '#38B2AC'
															: '#E8E8E8'
													}
													color={
														selectedchat === chat ? 'white' : 'black'
													}
													px={3}
													py={2}
													key={chat._id}
													_hover={{
														background: '#A3C9F9',
														color: 'white',
													}}
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
														padding: '.5rem',
													}}
												>
													{!chat?.isGroupChat ? (
														<>
															<Avatar
																mr={2}
																size="sm"
																ml="2"
																cursor="pointer"
																name={
																	!chat ? '' : chat?.users[1]?.name
																}
															/>
															<Text>
																{chat?.users[0]._id ===
																user?.result?._id
																	? chat?.users[1]?.name
																	: chat?.users[0]?.name}
															</Text>
														</>
													) : (
														<>
															{' '}
															<Avatar
																mr={2}
																size="sm"
																ml="2"
																cursor="pointer"
																name={chat?.chatName}
															/>
															{chat?.chatName}
														</>
													)}
												</Box>
											);
									  })
									: ''}
							</Stack>
						) : (
							<ChatLoading />
						)}
					</Box>
				</>
			) : (
				<SearchModal
					user={user}
					chats={chats}
					setNewGroup={setNewGroup}
				/>
			)}
		</Box>
	);
};

export default MyChats;
