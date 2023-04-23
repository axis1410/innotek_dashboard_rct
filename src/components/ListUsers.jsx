import { collection, onSnapshot } from 'firebase/firestore';
import MapContainer from './MapTest';
import { db } from '../lib/init-firebase';
import { useState, useEffect } from 'react';

export default function ListUsers() {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		getUsers();
	}, []);
	useEffect(() => {
		console.log(users);
	}, [users]);

	const getUsers = () => {
		const usersCollectionRef = collection(db, 'location');
		onSnapshot(usersCollectionRef, (snapshot) => {
			const usrs = snapshot.docs.map((doc) => ({
				data: doc.data(),
				id: doc.id,
			}));
			setUsers(usrs);
		});
	};
	return (
		<div>
			<h4>List of users</h4>
			<ul>
				{users.map((user) => (
					<li key={user.id}>
						{user.data.name}, Longitude: {user.data.longitude}, Latitude:
						{user.data.latitude}
					</li>
				))}
			</ul>

			<button onClick={() => getUsers()}>Refresh users</button>
			<MapContainer users={users} />
		</div>
	);
}