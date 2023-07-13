import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import AuthContext from './context/_context/AuthContext';
import UserContext from './context/_context/UserContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<BrowserRouter>
			{' '}
			<AuthContext>
				<UserContext>
					{' '}
					<ChakraProvider>
						<App />
					</ChakraProvider>
				</UserContext>
			</AuthContext>
		</BrowserRouter>
	</React.StrictMode>,
);
