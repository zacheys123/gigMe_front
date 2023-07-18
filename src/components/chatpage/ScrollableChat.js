import { useEffect, useState } from 'react';
import ScrollableFeed from 'react-scrollable-feed';
import {
	isSameSender,
	isLastSender,
	isSameSenderMargin,
	isSameUser,
} from './config/chatLogics';
import { useAuthContext } from '../../context/_context/AuthContext';
import { Avatar, Box, HStack } from '@chakra-ui/react';
const ScrollableChat = ({ messages, selectedchat }) => {
	const {
		authState: { user },
	} = useAuthContext();

	const [time, setTime] = useState();
	const [timeInfo, setTimeInfo] = useState();
	useEffect(() => {
		messages?.map((message) => {
			let date = new Date(
				message?.chat?.createdAt?.toString().split(' '),
			);
			let d = date?.toString().split(' ');

			setTime(d[4]);
			getInfo(d);
		});
	});
	const getInfo = (date) => {
		let d = date[4].split(':')[0];

		if (
			d === '01' ||
			d === '02' ||
			d === '03' ||
			d === '04' ||
			d === '05' ||
			d === '06' ||
			d === '07' ||
			d === '08' ||
			d === '09' ||
			d === '00'
		) {
			setTimeInfo('late night');
		} else if (d < 20 && d > 4) {
			setTimeInfo('Evening');
		} else if (d > 20 && d < 23) {
			setTimeInfo('at night');
		} else {
			setTimeInfo('morning');
		}
	};

	return (
		<ScrollableFeed>
			{messages &&
				messages.map((m, i) => {
					return (
						<div
							style={{
								display: 'flex',
								margin: '1rem 1rem 2.5rem 1rem',
								maxWidth: '100%',
							}}
							key={m._id}
						>
							{!m?.chat?.isGroupChat ? (
								<span
									style={{
										background: `${
											m?.sender[0]._id === user?.result._id
												? '#BEE3F8'
												: '#B9F5D0'
										}`,
										borderRadius: '99px',
										padding: '5px 15px',
										maxWidth: '95%',
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
							) : (
								<span
									style={{
										background: `${
											m?.sender[0]._id === user?.result._id
												? '#B4A7F8'
												: '#E4F5D0'
										}`,
										borderRadius: '9px',
										padding: '5px 15px',
										maxWidth: '95%',
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
									<Box d="flex" flexDir="column">
										<Box style={{ marginBottom: '.3rem' }}>
											{' '}
											{m.sender[0]._id === user.result._id ? (
												''
											) : (
												<HStack
													style={{
														display: 'flex',
														justifyContent: 'space-between',
														alignItems: 'center',
													}}
												>
													<p
														style={{
															fontSize: '.8rem',
															fontWeight: '300',
															fontFamily: 'cursive',
														}}
													>
														{m?.sender[0]?.name}
													</p>
													<p style={{ fontSize: '.7rem' }}>
														{m?.sender[0]?.email}
													</p>
												</HStack>
											)}
										</Box>
										<p> {m?.content}</p>
									</Box>
									<Box
										d="flex"
										justifyContent="space-beween"
										w="100%"
									>
										<Box style={{ flex: '4' }}>
											<span
												style={{
													fontSize: '.6em',
													marginRight: '.8rem',
												}}
											>
												{time}
											</span>
											<span style={{ fontSize: '.6em' }}>
												{timeInfo}
											</span>
										</Box>
									</Box>
								</span>
							)}
						</div>
					);
				})}
		</ScrollableFeed>
	);
};

export default ScrollableChat;
