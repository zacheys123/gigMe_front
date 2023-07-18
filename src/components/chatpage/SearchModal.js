import { useState } from 'react';
import {
	Input,
	FormControl,
	Stack,
	Text,
	useToast,
	Box,
	Divider,
	Button,
	CloseButton,
	Avatar,
} from '@chakra-ui/react';
import axios from 'axios';

import UserList from './userAvatar/UserList';
import { useMainContext } from '../../context/_context/UserContext';
import { UPDATECHATS, APPEND } from '../../context/types/users';
import { useNavigate } from 'react-router-dom';
const SearchModal = ({ user, chats, setNewGroup }) => {
	const baseUrl = 'https://gigme-backend.onrender.com';
	const [groupName, setGroupName] = useState('');
	const [selectedUsers, setSelectedUsers] = useState([]);
	const [searchQuery, setSearchQuery] = useState('');
	const [searchResult, setSearchResult] = useState([]);
	const [loading, setLoading] = useState(false);
	const [grouploading, setGroupLoading] = useState(false);

	const toast = useToast();
	const nav = useNavigate();
	const { userDispatch } = useMainContext();
	const handleSearch = async (query) => {
		setSearchQuery(query);
		if (!query) {
			setSearchResult([]);
			return;
		}
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
	const handleSubmit = async (ev) => {
		let token = user?.token;
		try {
			setGroupLoading(true);
			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			};

			const { data } = await axios.post(
				`${baseUrl}/api/group`,
				{
					users: JSON.stringify(selectedUsers.map((u) => u._id)),
					name: groupName,
				},
				config,
			);
			if (!chats.find((c) => c._id === data?.result?._id)) {
				userDispatch({ type: APPEND });
			}

			userDispatch({ type: UPDATECHATS, payload: data });
			nav('/chat');
			window.location.reload();
			setSelectedUsers([]);
			setSearchResult([]);
			setGroupName('');
			setSearchQuery('');
			setNewGroup(false);
			setGroupLoading(false);

			toast({
				title: data?.message,
				status: 'warning',
				duration: 3000,
				isClosable: true,
				position: 'top-left',
			});
			console.log(data);
		} catch (error) {
			setGroupLoading(false);
			console.log(error);
			toast({
				title: error?.response?.data?.message,
				status: 'warning',
				duration: 3000,
				isClosable: true,
				position: 'top-left',
			});
		}
	};
	const handleGroup = (userToadd) => {
		if (selectedUsers.includes(userToadd)) {
			toast({
				title: 'User Already Added',
				status: 'warning',
				duration: 3000,
				isClosable: true,
				position: 'top-left',
			});
			return;
		}
		setSelectedUsers([...selectedUsers, userToadd]);
	};

	const handleDelete = (u) => {
		return selectedUsers.splice(u, 1);
	};
	return (
		<Box w="100%" h="100%" mt={10}>
			{' '}
			<Box>
				<Box
					d="flex"
					justifyContent="space-between"
					style={{ display: 'flex', justifyContent: 'space-between' }}
					m="1"
				>
					<Text
						d="flex"
						color="green"
						fontSize={{ base: '17px', md: '15px', lg: '17px' }}
						m="2"
						fontWeight="bold"
					>
						Group Info:
					</Text>
					<Button
						colorScheme="yellow"
						variant="solid"
						bg="grey"
						color="white"
						onClick={() => setNewGroup((prev) => !prev)}
					>
						back
					</Button>{' '}
				</Box>
				<FormControl>
					<Input
						placeholder="Enter Chat Name"
						mb={3}
						value={groupName}
						onChange={(ev) => setGroupName(ev.target.value)}
					/>
				</FormControl>
			</Box>
			<Box>
				<Stack
					direction="row"
					w="100%"
					color="white"
					flexWrap={{ base: 'wrap', lg: 'wrap', md: 'nowrap' }}
				>
					{selectedUsers?.map((u, idx) => {
						return (
							<Box
								key={u._id}
								d="flex"
								p={2}
								bg={'purple'}
								borderRadius={'lg'}
								w={{ base: '20%', lg: '20%', md: '19%' }}
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
									fontSize="8px"
									size="sm"
									onClick={() => handleDelete(idx)}
								/>
							</Box>
						);
					})}
				</Stack>
			</Box>
			<Divider orientation="horizontal" m="2" />
			<Box>
				<Text
					d="flex"
					color="green"
					fontSize={{ base: '17px', md: '15px', lg: '17px' }}
					m="2"
					fontWeight="bold"
				>
					{' '}
					Search for users:
				</Text>

				<Divider orientation="horizontal" />
				<Box>
					{' '}
					<FormControl>
						<Input
							placeholder="Search Users e.g zach,mose,justo"
							mb={3}
							value={searchQuery}
							onChange={(e) => handleSearch(e.target.value)}
						/>
					</FormControl>
				</Box>
			</Box>
			<Box>
				{' '}
				<Button
					colorScheme="blue"
					mr={3}
					onClick={handleSubmit}
					px={1}
					py={1}
					fontSize={{ base: '14px', md: '10px', lg: '15px' }}
					isLoading={grouploading}
				>
					Create Group
				</Button>
			</Box>
			<Divider orientation="horizontal" m={2} />
			<Box
				style={{
					position: 'relative',
					h: '100%',
					overflowY: 'hidden',
				}}
			>
				<Box>
					<Text
						d="flex"
						color="green"
						fontSize={{ base: '14px', md: '13px', lg: '17px' }}
						m="2"
						fontWeight="bold"
					>
						All available users:
					</Text>
					{loading ? (
						<div>loading...</div>
					) : (
						searchResult?.map((user) => {
							return (
								<UserList
									key={user?._id}
									user={user}
									handleFunction={() => handleGroup(user)}
								/>
							);
						})
					)}
				</Box>
			</Box>
		</Box>
	);
};

export default SearchModal;
