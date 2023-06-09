import { db } from '../lib/init-firebase';
import { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';

import MapContainer from './MapContainer';
import PropTypes from 'prop-types';

ListUsers.propTypes = {
	mapData: PropTypes.shape({
		latitude: PropTypes.number,
		longitude: PropTypes.number,
	}),
};

export default function ListUsers(props) {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		getUsers();
	}, []);

	useEffect(() => {}, [users]);

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
		<div class="card">
  <div class="card-header">
    <h4 class="card-title">List of Users</h4>
  </div>
  <br />
  <div class="card-body">
    <ul class="user-list">
      {users.map((user) => (
        <li key={user.id}>
          {user.data.name}, Longitude: {user.data.longitude}, Latitude: {user.data.latitude}
        </li>
      ))}
    </ul>
	<br />
    <button class="btn btn-primary" onClick={() => getUsers()}>Refresh Users</button>
    <MapContainer users={users} mapData={props.mapData} />
  </div>
</div>
	);
}
