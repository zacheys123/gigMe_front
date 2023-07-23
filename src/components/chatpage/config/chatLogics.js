export const getSender = (chat, logged) => {
	return chat?.users[0]?._id === logged.result?._id
		? chat?.users[1]?.name
		: chat?.users[0]?.name;
};
export const getSenderFull = (logged, users) => {
	return users[0]?._id === logged?._id ? users[1] : users[0];
};

export const isSameSender = (messages, m, i, userid) => {
	return (
		(i < messages?.length - 1 &&
			messages[i + 1]?.sender[0]._id !== m.sender[0]._id) ||
		(messages[i + 1]?.sender[0]._id === undefined &&
			messages[i]?.sender[0]._id !== userid)
	);
};
export const isLastSender = (messages, i, userId) => {
	return (
		i === messages?.length - 1 &&
		messages[messages?.length - 1]?.sender[0]._id !== userId &&
		messages[messages?.length - 1]?.sender[0]._id
	);
};

export const isSameSenderMargin = (messages, m, i, userId) => {
	if (
		(i < messages?.length - 1 &&
			messages[i + 1]?.sender[0]._id !== m.sender[0]._id) ||
		(messages[i + 1]?.sender[0]._id === undefined &&
			messages[i]?.sender[0]._id !== userId)
	) {
		return 33;
	} else if (
		(i < messages?.length - 1 &&
			messages[i + 1].sender[0]._id !== m.sender[0]._id &&
			messages[i].sender[0]._id !== userId) ||
		(i === messages.length - 1 &&
			messages[i].sender[0]._id !== userId)
	)
		return -10;
	else return 'auto';
};
export const isSameUser = (messages, m, i) => {
	return i > 0 && messages[i - 1]?.sender[0]._id === m.sender[0]._id;
};
