import { ViewIcon } from '@chakra-ui/icons';
import {
	Box,
	Button,
	CloseButton,
	IconButton,
	useToast,
} from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import { useDisclosure } from '@chakra-ui/hooks';
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Input,
	FormControl,
	Stack,
	Text,
	Spinner,
} from '@chakra-ui/react';

import axios from 'axios';
import { useMainContext } from '../../context/_context/UserContext';
import UserList from './userAvatar/UserList';
import {
	addUserSlice,
	removeSlice,
	renameSlice,
} from '../../context/features/users';
import { useAuthContext } from '../../context/_context/AuthContext';
import { FETCHAGAIN, UPDATE } from '../../context/types/users';
const UpdateGroup = ({ fetchMessages, children }) => {
	const baseUrl = 'https://gigme-backend.onrender.com';
	const {
		userState: { selectedchat, chats },
		userDispatch,
	} = useMainContext();
	const {
		authState: { user },
	} = useAuthContext();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [groupName, setGroupName] = useState('');
	const [selectedUsers, setSelectedUsers] = useState([]);
	const [searchQuery, setSearchQuery] = useState('');
	const [searchResult, setSearchResult] = useState([]);
	const [loading, setLoading] = useState(false);
	const [showleave, setShowleave] = useState(false);
	const [addload, setaddLoad] = useState(false);
	const [leaveload, setleaveLoad] = useState(false);
	const [removeload, setRemoveLoad] = useState(false);

	const [loadingrename, setloadingRename] = useState(false);
	const toast = useToast();

	const handleSearch = async (query) => {
		setSearchQuery(query);
		if (!query) {
			setSearchResult([]);
			setShowleave(true);
			return;
		}
		setShowleave(true);
		let token = user?.token;
		try {
			setLoading(true);
			const config = {
				headers: { Authorization: `Bearer ${token}` },
			};

			const {
				data: { result },
			} = await axios.get(
				`${baseUrl}/api/users?search=${searchQuery}`,
				config,
			);
			setLoading(false);
			console.log(result);
			setSearchResult(result);
		} catch (error) {
			toast({
				title: 'Error Occured',
				description: 'Failed to Load the Search Results',
				duration: 3000,
				isClosable: true,
				position: 'bottom-left',
			});
		}
	};

	const handleRename = () => {
		renameSlice(
			onClose,
			selectedchat,
			setloadingRename,
			groupName,
			toast,
			userDispatch,
			user,
			setGroupName,
		);
	};

	const handleAddUser = useCallback((ev) => {
		console.log(selectedchat);
		addUserSlice(
			selectedchat,
			onClose,
			user,
			ev,
			setaddLoad,
			setSelectedUsers,
			selectedUsers,
			setSearchResult,
			setGroupName,
			setSearchQuery,
			toast,
			chats,
			userDispatch,
		);
	}, []);
	const handleRemove = async (ev) => {
		removeSlice(
			selectedchat,
			onClose,
			user,
			ev,
			setRemoveLoad,
			setSelectedUsers,
			selectedUsers,
			setSearchResult,
			setGroupName,
			setSearchQuery,
			toast,
			chats,
			userDispatch,
			fetchMessages,
		);
	};
	const handleLeave = async (user1) => {
		return user1.users.map((u) => {
			u?._id === user?.result?._id &&
				userDispatch({
					type: UPDATE,
					payload: { chats: chats, selected: '' },
				});
			userDispatch({
				type: FETCHAGAIN,
			});
		});
	};

	return (
		<Box>
			<span onClick={onOpen}>{children}</span>

			<IconButton
				d={{ base: 'flex' }}
				icon={<ViewIcon />}
				onClick={onOpen}
			/>

			<Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
				<ModalOverlay />
				<ModalContent h="410px">
					<ModalHeader fontSize="24px" fontFamily="Work Sans">
						{selectedchat?.chatName}
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody d="flex" flexDir="column" alignItems="center">
						<Stack
							direction="row"
							w="100%"
							color="white"
							pb={3}
							flexWrap={'wrap'}
						>
							{selectedchat?.users?.map((u) => {
								return (
									<Box
										key={u.email || u._id}
										d="flex"
										textAlign="center"
										px="2"
										bg={'purple'}
										borderRadius={'lg'}
										w={{ base: '14%', lg: '14%', md: '23%' }}
										fontSize="11px"
										m={1}
										flexWrap={'wrap'}
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											alignItems: 'center',
											flexWrap: 'wrap',
										}}
									>
										{u._id === user.result._id ? (
											<Text
												onClick={() => handleRemove(u)}
												cursor="pointer"
												colorScheme="red"
												p={3}
												color="white"
												fontFamily="cursive"
											>
												Leave Group
											</Text>
										) : (
											<Box
												d="flex"
												textAlign="center"
												px="2"
												bg={'purple'}
												borderRadius={'lg'}
												w={{ base: '14%', lg: '14%', md: '23%' }}
												fontSize="11px"
												m={1}
												flexWrap={'wrap'}
												style={{
													display: 'flex',
													justifyContent: 'space-between',
													alignItems: 'center',
													flexWrap: 'wrap',
												}}
											>
												<Text>{u.name}</Text>
												<CloseButton
													onClick={() => handleRemove(u)}
												/>
											</Box>
										)}
									</Box>
								);
							})}
						</Stack>
						<FormControl d="flex">
							<Input
								placeholder="Group Name"
								mb={3}
								w="80%"
								value={groupName}
								onChange={(ev) => setGroupName(ev.target.value)}
							/>
							<Button
								variant="solid"
								colorScheme="teal"
								onClick={handleRename}
								isLoading={loadingrename || removeload}
								ml={1}
							>
								Update
							</Button>{' '}
						</FormControl>
						<FormControl
							d="flex"
							style={{ display: 'flex', marginBottom: '1rem' }}
						>
							<Input
								placeholder="Search Users e.g zach,mose,justo"
								w="80%"
								value={searchQuery}
								onChange={(e) => handleSearch(e.target.value)}
							/>
						</FormControl>
						{loading ? (
							<Spinner size="lg" />
						) : (
							searchResult?.map((user) => {
								return (
									<UserList
										key={user?._id}
										user={user}
										handleFunction={() => handleAddUser(user)}
									/>
								);
							})
						)}
					</ModalBody>
				</ModalContent>
			</Modal>
		</Box>
	);
};

export default UpdateGroup;
