import React from 'react';
import ScrollableFeed from 'react-scrollable-feed';
import {
	isSameSender,
	isLastSender,
	isSameSenderMargin,
	isSameUser,
} from './config/chatLogics';
import { useAuthContext } from '../../context/_context/AuthContext';
import { Avatar, Tooltip } from '@chakra-ui/react';
const ScrollableChat = ({ messages }) => {
	const {
		authState: { user },
	} = useAuthContext();

	return (
		<ScrollableFeed>
			{messages &&
				messages.map((m, i) => {
					return (
						<div style={{ display: 'flex' }} key={m._id}>
							<span
								style={{
									background: `${
										m?.sender[0]._id === user?.result._id
											? '#BEE3F8'
											: '#B9F5D0'
									}`,
									borderRadius: '99px',
									padding: '5px 15px',
									maxWidth: '75%',
									marginLeft: isSameSenderMargin(
										messages,
										m,
										i,
										user.result._id,
									),
									marginTop: isSameUser(
										messages,
										m,
										i,
										user?.result._id,
									)
										? '5px'
										: '10px',
									marginBottom: isSameUser(
										messages,
										m,
										i,
										user?.result._id,
									)
										? '10px'
										: '10px',
								}}
							>
								{m?.content}
							</span>
						</div>
					);
				})}
		</ScrollableFeed>
	);
};

export default ScrollableChat;
