// import './App.css';
// import ListUsers from './components/ListUsers';
// import MapTest from './components/MapTest';
import { useState } from 'react';
import ListUsers from './components/ListUsers';
import MapContainer from './components/MapTest';

function App() {
	const [users, setUsers] = useState([
		{ id: 1, lat: 31.2510773, lng: 75.7004144 },
		{ id: 2, lat: 17.4107401, lng: 78.3923735 },
	]);

	return (
		<>
			<b>App.jsx</b>
			<ListUsers />
			{/* <MapContainer users={users} /> */}
		</>
	);
}

export default App;
