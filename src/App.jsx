// import './App.css';
// import ListUsers from './components/ListUsers';
// import MapTest from './components/MapTest';

import DeployForm from './components/DeployForm';
import DeleteDeployments from './components/DeleteDeployment';
import ListUsers from './components/ListUsers';
import GenerateCircle from './components/GenerateCircle';
import { useState } from 'react';

function App() {
	const [mapData, setMapData] = useState(null);

	console.log(mapData);

	return (
		<>
			<b>App.jsx</b>
			<DeployForm />
			<DeleteDeployments />
			<GenerateCircle setMapData={setMapData} />
			<ListUsers mapData={mapData} />

			{/* <MapContainer users={users} /> */}
		</>
	);
}

export default App;
