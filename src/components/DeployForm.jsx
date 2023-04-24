import { useState } from 'react';
import { db } from '../lib/init-firebase';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';

function DeploymentForm() {
	const [operationName, setOperationName] = useState('');
	const [longitude, setLongitude] = useState('');
	const [latitude, setLatitude] = useState('');

	const handleOperationNameChange = (e) => {
		setOperationName(e.target.value);
	};

	const handleLongitudeChange = (e) => {
		setLongitude(e.target.value);
	};

	const handleLatitudeChange = (e) => {
		setLatitude(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const q = query(collection(db, 'deployments'), where('operationName', '==', operationName));
		const querySnapshot = await getDocs(q);
		if (querySnapshot.empty) {
			try {
				await addDoc(collection(db, 'deployments'), {
					operationName,
					longitude: parseFloat(longitude),
					latitude: parseFloat(latitude),
				});
				setOperationName('');
				setLongitude('');
				setLatitude('');

				alert('Added operation to collection');
			} catch (e) {
				console.error('Error adding document: ', e);
			}
		} else {
			alert('Operation already exists!');
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className="coverform">
				<h2>Add Deployement Details</h2>
			<input
				type="text"
				value={operationName}
				onChange={handleOperationNameChange}
				placeholder="Operation Name"
			/>
			<input
				type="text"
				value={longitude}
				onChange={handleLongitudeChange}
				placeholder="Longitude"
			/>
			<input
				type="text"
				value={latitude}
				onChange={handleLatitudeChange}
				placeholder="Latitude"
			/>
			<br />
			<br />
			<button type="submit">Add Deployment</button>
			</div>
		</form>
	);
}

export default DeploymentForm;
