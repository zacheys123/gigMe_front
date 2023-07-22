import React, { useCallback, useEffect, useState } from 'react';
import {
	Drawer,
	DrawerBody,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	Button,
	Input,
	Box,
	useToast,
	Spinner,
} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/hooks';
import {
	accessChatSlice,
	searchSlice,
} from '../../context/features/users';
import { useMainContext } from '../../context/_context/UserContext';
import ChatLoading from './ChatLoading';
import UserList from './userAvatar/UserList';
const DrawerRight = ({ user, users, children }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = React.useRef();
	const inputref = React.useRef();
	const Toast = useToast();
	const [search, setSearch] = useState('');
	const [loading, setLoading] = useState('');
	const [selectedChatloading, setSelectedChatLoading] =
		useState(false);

	const {
		userState: { chats, search_chats },
		userDispatch,
	} = useMainContext();
	const handleSearch = useCallback((ev) => {
		ev.preventDefault();
		console.log(search);
		if (!search) {
			Toast({
				title: 'Please fill in the search',
				status: 'warning',
				duration: 3000,
				position: 'top-left',
				isClosable: true,
			});
		}
		searchSlice(user, setLoading, userDispatch, inputref?.current);
	}, []);

	useEffect(() => {
		inputref.current = search;
		console.log(search_chats);
	}, [search, users]);

	const accessChat = (selectedchatuser_id) => {
		accessChatSlice(
			user,
			setSelectedChatLoading,
			userDispatch,
			selectedchatuser_id,
			chats,
			onClose,
		);
	};
	return (
		<Box>
			{children && (
				<span ref={btnRef} onClick={onOpen}>
					{children}
				</span>
			)}
			<Drawer
				isOpen={isOpen}
				placement="left"
				onClose={onClose}
				finalFocusRef={btnRef}
				bg={'rgb(69, 66, 66)'}
			>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader>Search Users</DrawerHeader>

					<DrawerBody>
						<Box style={{ display: 'flex', paddingBottom: '5px' }}>
							<Input
								placeholder="Search by Name or Email"
								fontFamily="sans"
								value={search}
								onChange={(ev) => setSearch(ev.target.value)}
							/>
							<Button
								colorScheme="dark"
								bg="lightgrey"
								variant="ghost"
								ml="5px"
								onClick={handleSearch}
							>
								Go
							</Button>
						</Box>
						<Box mt={10} h="100%" py="4">
							{loading ? (
								<ChatLoading />
							) : (
								<span>
									{search_chats?.map((user) => {
										return (
											<UserList
												key={user._id}
												user={user}
												handleFunction={() => accessChat(user._id)}
											/>
										);
									})}
								</span>
							)}
						</Box>
						{selectedChatloading && <Spinner ml="auto" d="flex" />}
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</Box>
	);
};

export default DrawerRight;
