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
import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../../context/_context/AuthContext';
import ProfileModal from './ProfileModal';
import DrawerRight from './Drawer';

const SideDrawer = ({ loading, setLoading }) => {
	const {
		authState: { user, users },
		authDispatch,
	} = useAuthContext();

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
						<BellIcon />
					</MenuButton>
					{/*<MenuList><MenuList/>*/}
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
