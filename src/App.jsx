// import './App.css';
// import ListUsers from './components/ListUsers';
// import MapTest from './components/MapTest';

import DeployForm from './components/DeployForm';
import DeleteDeployments from './components/DeleteDeployment';
import ListUsers from './components/ListUsers';
import GenerateCircle from './components/GenerateCircle';
import { useState } from 'react';
import DeleteCircle from './components/DeleteCircle';

const App = () => {
	const [mapData, setMapData] = useState(null);

	console.log(mapData);

	return (
		<>
			<b>App.jsx</b>

			<DeployForm />
			<DeleteDeployments />
			<GenerateCircle setMapData={setMapData} />
			<DeleteCircle />
			<ListUsers mapData={mapData} />

			{/* <MapContainer users={users} /> */}
		</>
	);
};

export default App;
