import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Chats from './pages/Chats';
import SingleChat from './pages/SingleChat';
import { useAuthContext } from './context/_context/AuthContext';
import { getUsers } from './context/features/users';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ASSIGNUSER } from './context/types/auth';
function App() {
	const { authDispatch } = useAuthContext();
	const nav = useNavigate();

	const id = JSON.parse(localStorage.getItem('profile'));
	useEffect(() => {
		authDispatch({ type: ASSIGNUSER, payload: id });
		if (!id) {
			nav('/');
		}
	}, [id, nav]);
	return (
		<div className="app">
			<Routes>
				<Route exact path="/">
					<Route index element={<Home />} />
					<Route path="/chat/*" element={<Chats />} />
				</Route>
			</Routes>
		</div>
	);
}

export default App;
