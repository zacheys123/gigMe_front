import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import AuthContext from './context/_context/AuthContext';
import UserContext from './context/_context/UserContext';

import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
	typography: {
		allVariants: {
			fontFamily: ['"Nunito Sans"', 'sans-serif'].join(','),
		},
		DesktopH1: {
			// <-- variant example
			fontWeight: 900,
			fontSize: '56px',
			letterSpacing: '1%',
			lineHeight: '67.2px',
		},
	},
});
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<BrowserRouter>
			{' '}
			<ThemeProvider theme={theme}>
				<AuthContext>
					<UserContext>
						{' '}
						<ChakraProvider>
							<App />
						</ChakraProvider>
					</UserContext>
				</AuthContext>
			</ThemeProvider>
		</BrowserRouter>
	</React.StrictMode>,
);
