/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../lib/init-firebase';
import MapContainer from './MapContainer';
import PropTypes from 'prop-types';

const GenerateCircle = (props) => {
	const [deployments, setDeployments] = useState([]);
	const [selectedDeployment, setSelectedDeployment] = useState(null);
	const [mapData, setMapData] = useState(null);

	useEffect(() => {
		const getDeployments = async () => {
			const deploymentsCol = collection(db, 'deployments');
			const deploymentSnapshot = await getDocs(deploymentsCol);
			const deploymentList = deploymentSnapshot.docs.map((doc) => doc.data());
			setDeployments(deploymentList);
		};

		getDeployments();
	}, []);

	const handleSelectChange = (event) => {
		setSelectedDeployment(event.target.value);
	};

	async function addCircleToFirebase(center, radius) {
		const circleData = {
			center: {
				latitude: center.lat,
				longitude: center.lng,
			},
			radius: radius,
		};

		try {
			await addDoc(collection(db, 'circles'), circleData);
		} catch (error) {
			console.error('Error adding circle to Firebase:', error);
		}
	}

	const handleButtonClick = () => {
		console.log('handleButtonClick called');
		if (selectedDeployment) {
			const deployment = deployments.find(
				(deployment) => deployment.operationName === selectedDeployment,
			);
			if (deployment) {
				props.setMapData({
					latitude: deployment.latitude,
					longitude: deployment.longitude,
				});

				// Add circle to Firebase
				const center = {
					lat: deployment.latitude,
					lng: deployment.longitude,
				};
				const radius = 1000;
				addCircleToFirebase(center, radius);
			}
		}
	};

	return (
		<>
			<select onChange={handleSelectChange}>
				<option>Select an operation to deploy</option>
				{deployments.map((deployment) => (
					<option key={deployment.operationName} value={deployment.operationName}>
						{deployment.operationName}
					</option>
				))}
			</select>
			<button onClick={handleButtonClick}>Create Perimeter</button>
			{mapData && <MapContainer {...mapData} />}
		</>
	);
};

GenerateCircle.propTypes = {
	setMapData: PropTypes.func.isRequired,
};

export default GenerateCircle;
