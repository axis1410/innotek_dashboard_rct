import './App.css';
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

	return (
		<>
			{/* <b>App.jsx</b> */}

			<DeployForm />
			<DeleteDeployments />
			<br />
			<GenerateCircle setMapData={setMapData} />
			<br />
			<DeleteCircle />
			<br />
			<ListUsers mapData={mapData} />
			<br />

			{/* <MapContainer users={users} /> */}
		</>
	);
};

export default App;
