import { useState, useEffect } from 'react';
import { db } from '../lib/init-firebase';
import { collection, doc, deleteDoc, getDocs } from 'firebase/firestore';

const DeleteCircle = () => {
	const [circles, setCircles] = useState([]);
	const [selectedCircle, setSelectedCircle] = useState('');

	useEffect(() => {
		fetchCircles();
	}, []);

	const fetchCircles = async () => {
		try {
			const querySnapshot = await getDocs(collection(db, 'circles'));
			const circlesData = [];
			querySnapshot.forEach((doc) => circlesData.push({ ...doc.data(), id: doc.id }));
			setCircles(circlesData);
		} catch (e) {
			console.error('Error fetching documents: ', e);
		}
	};

	const handleDelete = async () => {
		try {
			await deleteDoc(doc(db, 'circles', selectedCircle));
			setCircles(circles.filter((circle) => circle.id !== selectedCircle));
		} catch (e) {
			console.error('Error deleting document: ', e);
		}
	};

	return (
		<>
			<select value={selectedCircle} onChange={(e) => setSelectedCircle(e.target.value)}>
				<option>Select a circle to delete</option>
				{circles.map((circle) => (
					<option key={circle.id} value={circle.id}>
						Circle ID: {circle.id}
					</option>
				))}
			</select>
			<button onClick={handleDelete}>Delete Circle</button>
		</>
	);
};

export default DeleteCircle;
