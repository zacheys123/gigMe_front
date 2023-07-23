import React, { useEffect, useRef, useState } from 'react';
import { useMainContext } from '../../context/_context/UserContext';
import { useAuthContext } from '../../context/_context/AuthContext';
import {
	useToast,
	Box,
	Button,
	HStack,
	Stack,
	Text,
	Avatar,
	IconButton,
	Divider,
} from '@chakra-ui/react';
import { fetchSlice } from '../../context/features/users';
import { AddIcon } from '@chakra-ui/icons';
import NewChat from './userAvatar/NewChat';
import ChatLoading from './ChatLoading';
import { CREATECHAT } from '../../context/types/users';
import { getSender } from './config/chatLogics';
import SearchModal from './SearchModal';
import { useMediaQuery } from '@chakra-ui/react';
import MessageIcon from '@mui/icons-material/Message';
import Phone from '@mui/icons-material/PhoneEnabled';
import Group from '@mui/icons-material/Groups3';
import GroupAdd from '@mui/icons-material/GroupAdd';
import VideocamIcon from '@mui/icons-material/Videocam';
import {
	single_func,
	group_func,
	phone_func,
	video_func,
	default_func,
} from './config/utils_ref';
import './style.css';
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
	const [singlechat, setSingleChat] = useState([]);
	const [groupchat, setGroupChat] = useState([]);

	useEffect(() => {
		setSingleChat(chats?.filter((chat) => !chat?.isGroupChat));
	}, [selectedchat]);
	const singleref = useRef();
	const groupref = useRef();
	const phoneref = useRef();
	const group_ref = useRef();
	const single_ref = useRef();
	const phone_ref = useRef();
	const video_ref = useRef();
	const videoref = useRef();

	const navrefs = {
		singleref,
		groupref,
		phoneref,
		videoref,
	};
	const navs = {
		phone_ref,
		group_ref,
		single_ref,
		video_ref,
	};

	useEffect(() => {
		default_func(navrefs, navs);
		console.log(notifications);
	}, []);
	return (
		<HStack
			style={{
				display: selectedchat && isSmallScreen ? 'none' : 'flex',
				flex: selectedchat && isSmallScreen ? '9' : '3',
				flexDirection: 'column',
				flex: 1,
			}}
			h="100%"
		>
			<Box
				fontSize={{ base: '28px', md: '30px' }}
				fontFamily="Work sans"
				d="flex"
				style={{}}
				w="100%"
				justifyContent="space-between"
				alignItems="center"
			>
				<IconButton
					onClick={() => single_func(navrefs, navs)}
					ref={single_ref}
					sx={{
						borderRadius: '30px !important',
						fontSize: '.6rem ',
						marginLeft: '.5rem !important',
					}}
				>
					<MessageIcon
						sx={{
							fontSize: '1.1rem',
						}}
					/>
				</IconButton>
				<IconButton
					onClick={() => group_func(navrefs, navs)}
					ref={group_ref}
					sx={{
						borderRadius: '30px !important',
						fontSize: '.6rem ',
						marginLeft: '.5rem !important',
					}}
				>
					<Group
						sx={{
							fontSize: '1.1rem',
						}}
					/>
				</IconButton>{' '}
				<IconButton
					onClick={() => phone_func(navrefs, navs)}
					ref={phone_ref}
					sx={{
						borderRadius: '30px !important',
						fontSize: '.6rem ',
						marginLeft: '.5rem !important',
					}}
				>
					<Phone
						sx={{
							fontSize: '1.1rem',
						}}
					/>
				</IconButton>{' '}
				<IconButton
					onClick={() => video_func(navrefs, navs)}
					ref={video_ref}
					sx={{
						borderRadius: '30px !important',
						fontSize: '.6rem ',
						marginLeft: '.5rem !important',
					}}
				>
					<VideocamIcon
						sx={{
							fontSize: '1.1rem',
						}}
					/>
				</IconButton>{' '}
				<Divider orientation="horizontal" mt={1} />
			</Box>

			<Box
				style={{
					display: selectedchat && isSmallScreen ? 'none' : 'flex',
					width: !isSmallScreen ? '100%' : '100%',

					flex: 9,
				}}
				flexDir="column"
				alignItems="center"
				bg={'white'}
				borderRadius="lg"
				borderWidth="1px"
				h="100%"
				w="100%"
			>
				<Box ref={singleref}>
					<Box>
						<Text
							textAlign="left"
							fontWeight="bold"
							fontSize="12px"
							fontFamily="cursive sans"
							zIndex="999"
							mb={6}
							ml={4}
						>
							Pinned:
						</Text>
						{notifications.map(() => {})}
					</Box>
					<Text
						textAlign="left"
						fontWeight="bold"
						fontSize="12px"
						fontFamily="cursive sans"
						zIndex="999"
						mb={3}
						mt={3}
						ml={4}
					>
						Chat History:
					</Text>
					<Box
						flexDir="column"
						p={3}
						bg="#F8F8F8"
						w="100%"
						h="85%"
						borderRadius="lg"
						overflowY="hidden"
						mt={1}
					>
						{!loadingchats ? (
							<Stack overflowY="scroll">
								{singlechat.map((chat) => {
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
												selectedchat === chat ? '#38B2AC' : '#E8E8E8'
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
											<>
												<Avatar
													mr={2}
													size="sm"
													ml="2"
													cursor="pointer"
													name={!chat ? '' : chat?.users[1]?.name}
												/>
												<Text>{getSender(chat, user)}</Text>
											</>
										</Box>
									);
								})}
							</Stack>
						) : (
							<ChatLoading />
						)}
					</Box>
				</Box>

				<SearchModal
					myref={groupref}
					user={user}
					chats={chats}
					setNewGroup={setNewGroup}
				/>
				<Box ref={phoneref}></Box>
				<Box ref={videoref}></Box>
			</Box>
		</HStack>
	);
};

export default MyChats;
