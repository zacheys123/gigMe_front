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
import {
	CREATECHAT,
	SETNOTIFICATIONS,
} from '../../context/types/users';
import { getSender } from './config/chatLogics';
import SearchModal from './SearchModal';
import { useMediaQuery } from '@chakra-ui/react';
import Badge from '@mui/material/Badge';
const MyChats = () => {
	const {
		userState: { chats, selectedchat, fetchagain, notifications },
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

	const [isSmallScreen] = useMediaQuery('(max-width: 820px)');

	return (
		<Box
			style={{
				display: selectedchat && isSmallScreen ? 'none' : 'flex',
				width: !isSmallScreen ? '31%' : '100%',
			}}
			flexDir="column"
			alignItems="center"
			p={3}
			bg={'white'}
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
						style={{
							display:
								selectedchat && isSmallScreen ? 'none' : 'flex',
							flex: selectedchat && isSmallScreen ? '9' : '3',
						}}
						w="100%"
						justifyContent="space-between"
						alignItems="center"
					>
						<Text
							fontSize={isSmallScreen ? '10px' : '13px'}
							fontWeight="bold"
							fontFamily="Sofia Sans"
						>
							My Chats
						</Text>
						<Button
							d="flex"
							fontSize={isSmallScreen ? '10px' : '15px'}
							fontFamily="Sofia Sans"
							rightIcon={<AddIcon sx={{ fontSize: '.6rem' }} />}
							onClick={() => setNewGroup((prev) => !prev)}
						>
							New Group Chat
						</Button>
					</Box>

					<Box>
						{' '}
						<Box>
							{' '}
							<Text
								textAlign="left"
								fontWeight="bold"
								fontSize="12px"
								fontFamily="cursive sans"
								mt={3}
								mb={3}
							>
								New Notifications:
							</Text>
						</Box>
						<Stack overflowY="scroll">
							{notifications
								? notifications?.map((notif) => {
										return (
											<Box
												d="flex"
												flexDirection="column"
												onClick={() =>
													userDispatch({
														type: SETNOTIFICATIONS,
														payload: notif,
													})
												}
												cursor="pointer"
												bg={
													selectedchat === notif?.chat
														? '#38B2AC'
														: '#E8E8E8'
												}
												color={
													selectedchat === notif?.chat
														? 'white'
														: 'black'
												}
												px={1}
												py={1}
												key={notif?._id}
												_hover={{
													background: '#A3C9F9',
													color: 'white',
												}}
												w="100% "
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
												<Box>
													{!notif?.chat?.isGroupChat ? (
														<>
															<Avatar
																mr={2}
																size="sm"
																ml="2"
																cursor="pointer"
																name={
																	!notif ? '' : notif?.sender[0]?.name
																}
															/>
															<Text>
																{notif?.chat?.users[0]?._id !==
																user.result?._id
																	? notif?.sender[0]?.name
																	: ''}
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
																name={notif?.chat?.chatName}
															/>
															{notif?.chat?.chatName}
														</>
													)}{' '}
												</Box>
												<Text
													fontSize="12px"
													fontWeight="bold"
													fontFamily="cursive"
												>
													{notif?.content}
												</Text>
												<Badge
													sx={{
														left: '45%',
														top: '-43%',
														fontSize: '10px ',
													}}
													badgeContent={notifications.length}
													color="error"
												/>
											</Box>
										);
								  })
								: ''}
						</Stack>
					</Box>
					<Box
						style={{
							display:
								selectedchat && isSmallScreen ? 'none' : 'flex',
						}}
						flexDir="column"
						p={3}
						bg="#F8F8F8"
						w="100%"
						h="95%"
						borderRadius="lg"
						overflowY="hidden"
					>
						<Text
							textAlign="left"
							fontWeight="bold"
							fontSize="12px"
							fontFamily="cursive sans"
							mt={3}
							mb={3}
						>
							Chat history:
						</Text>
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
													key={chat?._id}
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
																	!chat ? '' : chat?.users[0]?.name
																}
															/>
															<Text>{getSender(chat, user)}</Text>
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
