import { Button, IconButton, useDisclosure } from '@chakra-ui/react';
import { useEffect } from 'react';
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Image,
	Text,
} from '@chakra-ui/react';
import { ViewIcon } from '@chakra-ui/icons';
const ProfileModal = ({ user, children }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<>
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
						fontSize="40px"
						fontFamily="Work Sans"
						d="flex"
						style={{
							display: 'flex',

							justifyContent: 'center',
						}}
						justifyContent={'center'}
					>
						{user?.result?.name || user?.name}
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody
						d="flex"
						flexDir="column"
						alignItems="center"
						justifyContent="space-between"
						style={{
							display: 'flex',
							justifyContent: 'space-between',
						}}
					>
						<Image borderRadius="full" boxSize="150px" />
						<Text>Email: {user?.result?.email || user?.email}</Text>
					</ModalBody>

					<ModalFooter>
						<Button colorScheme="blue" mr={3} onClick={onClose}>
							Close
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default ProfileModal;
