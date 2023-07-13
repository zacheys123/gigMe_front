import { Box, Text, IconButton } from '@chakra-ui/react';
import { ArrowBackIcon, ViewIcon } from '@chakra-ui/icons';
import { CREATECHAT } from '../../context/types/users';
import { useMainContext } from '../../context/_context/UserContext';
import { useAuthContext } from '../../context/_context/AuthContext';
import NewChat from './userAvatar/NewChat';
import UpdateGroup from './UpdateGroup';
import { getSenderFull } from './config/chatLogics';
import ProfileModal from './ProfileModal';
const Header = ({ fetchMessages }) => {
	const {
		userState: { selectedchat },
		userDispatch,
	} = useMainContext();
	const {
		authState: { user },
	} = useAuthContext();
	// console.log(selectedchat?.users[1].name);
	// console.log(selectedchat?.users[0]._id, user?.result?._id);
	return <Box flex={0.1}></Box>;
};
export default Header;
