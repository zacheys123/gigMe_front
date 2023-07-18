import {
	Box,
	Button,
	Text,
	Tooltip,
	Menu,
	MenuButton,
	Avatar,
	MenuItem,
	MenuList,
	MenuDivider,
} from '@chakra-ui/react';
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons';
import React, { useEffect, useState, useRef } from 'react';
import { useAuthContext } from '../../context/_context/AuthContext';
import { useMainContext } from '../../context/_context/UserContext';
import ProfileModal from './ProfileModal';
import DrawerRight from './Drawer';
import NotificationBadge from 'react-notification-badge';
import { Effect } from 'react-notification-badge';
import {
	CREATECHAT,
	SETNOTIFICATIONS,
} from '../../context/types/users';
import Badge from '@mui/material/Badge';
const SideDrawer = ({ loading, setLoading }) => {
	const {
		authState: { user, users },
		authDispatch,
	} = useAuthContext();
	const {
		userState: { notifications },
		userDispatch,
	} = useMainContext();
	const notref = useRef();
	const [loadingChhat, setLoadingChat] = useState();

	const logout = () => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
			localStorage.removeItem('profile');
		}, 2000);
	};

	useEffect(() => {
		console.log(users);
	}, [users]);
	return (
		<>
			<Box
				d="flex"
				justifyContent="space-between"
				alignItems="center"
				bg="white"
				w="100%"
				p="5px 10px 5px 10px"
				borderWidth="5px"
				style={{ display: 'flex' }}
			>
				<DrawerRight user={user} users={users}>
					<Tooltip
						label="Search Users to Chat"
						hasArrow
						placement="bottom-end"
					>
						<Button variant="ghost">
							<i className="fa fa-search"></i>
							<Text d={{ base: 'none', md: 'flex' }} px="4">
								Search User
							</Text>
						</Button>
					</Tooltip>
				</DrawerRight>
				<Box></Box>
				<Menu>
					<MenuButton p={1}>
						<Badge badgeContent={notifications.length} color="error">
							<BellIcon />
						</Badge>
					</MenuButton>
					<MenuList pl={2}>
						{!notifications.length && 'no new messages'}
						{notifications.map((notification) => {
							return (
								<MenuItem
									key={notification._id}
									onClick={() => {
										userDispatch({
											type: CREATECHAT,
											payload: notification?.chat,
										});
										userDispatch({
											type: SETNOTIFICATIONS,
											payload: notifications.filter(
												(n) => n !== notification,
											),
										});
									}}
								>
									{notification.chat.isGroupChat
										? `New Message in ${notification.chat.chatName}`
										: `Message from ${
												notification.sender[0]?._id ===
												user.result?._id
													? notification.sender[1]?.name
													: notification.sender[0]?.name
										  }`}
								</MenuItem>
							);
						})}
					</MenuList>
				</Menu>
				<Menu>
					<MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
						<Avatar
							size="sm"
							cursor="pointer"
							name={user?.result?.name}
						/>
					</MenuButton>
					<MenuList>
						<ProfileModal user={user}>
							{' '}
							<MenuItem>My Profile</MenuItem>
						</ProfileModal>
						<MenuDivider />
						<MenuItem onClick={logout}>Logout</MenuItem>
					</MenuList>
				</Menu>
			</Box>
		</>
	);
};

export default SideDrawer;
