import React from 'react';

const Logout = () => {
	return (
		<div
			style={{
				width: '100vw',
				height: '90vh',
				opacity: 0.7,
				background: 'lightgrey',
				position: 'relative',
			}}
		>
			<div
				style={{
					justifyContent: 'center',
					alignItems: 'center',
					display: 'flex',
					width: '100%',
					height: '100%',

					position: 'absolute',
				}}
			>
				<div
					style={{
						color: 'white',
						fontSize: '3rem',
						fontFamily: 'cursive',
					}}
				>
					Logged Out....
				</div>
			</div>
		</div>
	);
};

export default Logout;
