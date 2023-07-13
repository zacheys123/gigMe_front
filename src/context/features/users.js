import axios from 'axios';
import {
	CREATECHAT,
	FETCHUSERSCHATS,
	SEARCHED_DATA,
	APPEND,
	FETCHAGAIN,
	UPDATECHATS,
	UPDATE,
	UPDATEALLCHATS,
} from '../types/users';
export const searchSlice = async (
	user,
	setLoading,
	dispatch,
	search,
) => {
	const token = user?.token;
	console.log(search);
	try {
		setLoading(true);
		const config = {
			headers: { Authorization: `Bearer ${token}` },
		};

		const {
			data: { result },
		} = await axios.get(
			`http://localhost:3500/api/users?search=${search}`,
			config,
		);
		setLoading(false);
		console.log(result);
		dispatch({ type: SEARCHED_DATA, payload: result });
	} catch (error) {
		setLoading(false);
		console.log(error.message);
	}
};

export const accessChatSlice = async (
	user,
	setLoading,
	dispatch,
	id,
	chats,
) => {
	setLoading(true);
	let config = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${user.token}`,
		},
	};

	try {
		const { data } = await axios.post(
			'http://localhost:3500/api/chats',
			{ userId: id },
			config,
		);
		if (!chats.find((c) => c._id === data._id)) {
			dispatch({ type: APPEND });
		}

		dispatch({ type: CREATECHAT, payload: data });
		setLoading(false);
		window.location.reload();
	} catch (error) {
		console.log(error);
	}
};
export const fetchSlice = async (dispatch, user, setLoading) => {
	setLoading(true);
	try {
		let token = user?.token;
		const config = {
			headers: { Authorization: `Bearer ${token}` },
		};

		const { data } = await axios.get(
			'http://localhost:3500/api',
			config,
		);
		setLoading(false);
		dispatch({ type: FETCHUSERSCHATS, payload: data });
	} catch (error) {
		console.log(error);
	}
};

export const renameSlice = async (
	onClose,
	user,
	setLoading,
	name,
	toast,
	dispatch,
	tokenkey,
	setGroup,
) => {
	let token = tokenkey?.token;
	try {
		setLoading(true);
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		};

		const { data } = await axios.put(
			`http://localhost:3500/api/rename`,
			{ chatId: user?._id, chatName: name },
			config,
		);
		dispatch({ type: FETCHAGAIN });
		setLoading(false);
		console.log(data);
		setGroup('');
		onClose();
	} catch (error) {
		setLoading(false);
		toast({
			title: error?.response?.data?.message,
			description: 'Failed to Rename Group',
			duration: 3000,
			isClosable: true,
			position: 'top',
		});
		setGroup('');
	}
};

export const addUserSlice = async (
	selectedGroupchat,
	onClose,
	loggeduser,
	selectedUser,
	setaddLoad,
	setSelectedUsers,
	selectedUsers,
	setSearchResult,
	setGroupName,
	setSearchQuery,
	toast,
	chats,
	userDispatch,
) => {
	let token = loggeduser?.token;
	if (
		selectedGroupchat?.users?.find((u) => u._id === selectedUser._id)
	) {
		toast({
			title: 'User Already In the Group',
			status: 'error',
			duration: 3000,
			isClosable: true,
			position: 'bottom',
		});
		return;
	}

	if (selectedGroupchat.groupAdmin?._id !== loggeduser?.result?._id) {
		toast({
			title: 'Only Admins Can Modify Group Info',
			status: 'error',
			duration: 3000,
			isClosable: true,
			position: 'bottom',
		});
		return;
	}
	try {
		setaddLoad(true);

		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		const { data } = await axios.put(
			'http://localhost:3500/api/groupadd',
			{
				chatId: selectedGroupchat?._id,
				userId: selectedUser?._id,
			},
			config,
		);

		userDispatch({ type: UPDATECHATS, payload: data });
		userDispatch({ type: CREATECHAT, payload: data });
		userDispatch({ type: FETCHAGAIN });
		setSelectedUsers([]);
		setSearchResult([]);
		setGroupName('');
		setSearchQuery('');
		setaddLoad(false);

		toast({
			title: data?.message,
			status: 'warning',
			duration: 3000,
			isClosable: true,
			position: 'top-left',
		});
		console.log(data);
	} catch (error) {
		setaddLoad(false);
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

export const removeSlice = async (
	selectedGroupchat,
	onClose,
	loggeduser,
	selectedUser,
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
) => {
	if (
		selectedGroupchat?.groupAdmin?._id !== loggeduser?.result?._id &&
		selectedUser._id !== loggeduser.result._id
	) {
		toast({
			title: 'Only Admins Can Remove Users',
			status: 'error',
			duration: 3000,
			isClosable: true,
			position: 'bottom',
		});
		return;
	}
	let token = loggeduser?.token;

	try {
		setRemoveLoad(true);

		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		const { data } = await axios.put(
			'http://localhost:3500/api/groupremove',
			{
				chatId: selectedGroupchat?._id,
				userId: selectedUser?._id,
			},
			config,
		);

		selectedUser?._id === loggeduser?.result?._id
			? userDispatch({
					type: UPDATE,
					payload: { chats: '', selected: '' },
			  })
			: userDispatch({
					type: UPDATEALLCHATS,
					payload: { chats: data, selected: data },
			  });
		userDispatch({ type: FETCHAGAIN });
		fetchMessages();
		setRemoveLoad(false);
		toast({
			title: data?.message,
			status: 'warning',
			duration: 3000,
			isClosable: true,
			position: 'top-left',
		});
		console.log(data);
		window.location.reload();
	} catch (error) {
		setRemoveLoad(false);
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
