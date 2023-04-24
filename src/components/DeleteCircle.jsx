import { useState, useEffect } from 'react';
import { db } from '../lib/init-firebase';
import { collection, doc, deleteDoc, getDocs } from 'firebase/firestore';

const DeleteCircle = () => {
	const [circles, setCircles] = useState([]);

	useEffect(() => {
		getCircles();
	}, []);

	const getCircles = async () => {
		const circlesRef = collection(db, 'circles');
		const querySnapshot = await getDocs(circlesRef);
		const circlesData = [];
		querySnapshot.forEach((doc) => {
			circlesData.push({ id: doc.id, ...doc.data() });
		});
		setCircles(circlesData);
	};

	const handleDelete = async (id) => {
		const circleRef = doc(db, 'circles', id);
		await deleteDoc(circleRef);
		setCircles((prevCircles) => prevCircles.filter((circle) => circle.id !== id));
	};

	return (
		<div>
			<h2>Circles</h2>
			<select>
				{circles.map((circle) => (
					<option key={circle.id} value={circle.id}>
						Center: {circle.center.latitude}, {circle.center.longitude} | Radius:{' '}
						{circle.radius}
					</option>
				))}
			</select>

			<button onClick={handleDelete}>Delete Circle from Collection</button>
		</div>
	);
};

export default DeleteCircle;
