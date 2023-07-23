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

import {
	CREATECHAT,
	SETNOTIFICATIONS,
} from '../../context/types/users';
import { useMediaQuery } from '@chakra-ui/react';
import Badge from '@mui/material/Badge';
const SideDrawer = ({ loading, setLoading }) => {
	const {
		authState: { user, users },
		authDispatch,
	} = useAuthContext();
	const {
		userState: { notifications, selectedchat },
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
	const [isSmallScreen] = useMediaQuery('(max-width: 820px)');
	const local_notifications = [];
	return (
		<>
			<Box
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
							<Text
								px="4"
								style={{ display: isSmallScreen ? 'none' : 'flex' }}
							>
								Search User
							</Text>
						</Button>
					</Tooltip>
				</DrawerRight>
				<Box>GigMe</Box>
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
							src={user?.pic}
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
