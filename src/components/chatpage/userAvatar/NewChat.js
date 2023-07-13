import { ViewIcon } from '@chakra-ui/icons';
import { Box, Button, IconButton, useToast } from '@chakra-ui/react';
import { useState } from 'react';
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
} from '@chakra-ui/react';
import { getSender } from '../config/chatLogics';
const NewChat = ({ user, chats, children }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [groupName, setGroupName] = useState();
	const [selectedUsers, setSelectedUsers] = useState([]);
	const [searchQuery, setSearchQuery] = useState();
	const [searchResult, setSearchResult] = useState();
	const [loading, setLoading] = useState(false);

	const toast = useToast();

	const handleSearch = (ev) => {};
	return (
		<Box>
			{children ? (
				<span onClick={onOpen}>{children}</span>
			) : (
				<IconButton
					d={{ base: 'flex' }}
					icon={<ViewIcon />}
					onClick={onOpen}
				/>
			)}
			<Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
				<ModalOverlay />
				<ModalContent h="410px">
					<ModalHeader
						fontSize="35"
						fontFamily="Work Sans"
						d="flex"
						style={{
							display: 'flex',

							justifyContent: 'center',
						}}
						justifyContent={'center'}
					>
						Create Group Chat
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody
						d="flex"
						flexDir="column"
						alignItems="center"
						style={{
							display: 'flex',
							justifyContent: 'space-between',
						}}
					>
						<FormControl>
							<Input
								placeholder="Chat Name"
								mb={3}
								value={groupName}
								onChange={(ev) => setGroupName(ev.target.value)}
							/>
						</FormControl>
						{chats?.map((chat) => {
							return (
								<Stack key={chat._id} d="flex">
									<Text bg>
										{getSender(user?.result, chat?.users)}
									</Text>
								</Stack>
							);
						})}
						<FormControl>
							<Input
								placeholder="Add Users e.g zach,mose,justo"
								mb={3}
								value={searchQuery}
								onChange={handleSearch}
							/>
						</FormControl>
					</ModalBody>

					<ModalFooter>
						<Button colorScheme="blue" mr={3} onClick={onClose}>
							Create
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Box>
	);
};

export default NewChat;
