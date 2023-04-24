import { useEffect, useState } from 'react';
import { db } from '../lib/init-firebase';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';

function Dropdown() {
	const [operations, setOperations] = useState([]);
	const [selectedOperation, setSelectedOperation] = useState('');

	useEffect(() => {
		fetchOperations();
	}, []);

	const fetchOperations = async () => {
		try {
			const querySnapshot = await getDocs(collection(db, 'deployments'));
			const operationsData = [];
			querySnapshot.forEach((doc) => operationsData.push({ ...doc.data(), id: doc.id }));
			setOperations(operationsData);
		} catch (e) {
			console.error('Error fetching documents: ', e);
		}
	};

	const handleDelete = async () => {
		try {
			await deleteDoc(doc(db, 'deployments', selectedOperation));
			setOperations(operations.filter((op) => op.id !== selectedOperation));
		} catch (e) {
			console.error('Error deleting document: ', e);
		}
	};

	return (
		<>
			<select value={selectedOperation} onChange={(e) => setSelectedOperation(e.target.value)}>
				<option value="">Select an operation</option>
				{operations.map((operation) => (
					<option key={operation.id} value={operation.id}>
						{operation.operationName}
					</option>
				))}
			</select>
			<button onClick={handleDelete}>Delete Deployment</button>
		</>
	);
}

export default Dropdown;
