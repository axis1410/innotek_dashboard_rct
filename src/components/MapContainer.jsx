/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */

import { Map, GoogleApiWrapper, Marker, Circle } from 'google-maps-react';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/init-firebase';

const MapContainer = (props) => {
	const [circles, setCircles] = useState([]);

	useEffect(() => {
		// Get data about circles from Firebase
		const getCircles = async () => {
			const circles = [];
			const querySnapshot = await getDocs(collection(db, 'circles'));
			querySnapshot.forEach((doc) => {
				circles.push(doc.data());
			});
			console.log('circles:', circles);

			// Set state with data about circles
			setCircles(circles);
		};

		getCircles();
	}, []);

	const center = props.mapData
		? {
				lat: parseFloat(props.mapData.latitude),
				lng: parseFloat(props.mapData.longitude),
		  }
		: {
				lat: props.users[0].data.latitude,
				lng: props.users[0].data.longitude,
		  };

	return (
		<Map
			google={props.google}
			zoom={14}
			initialCenter={{
				lat: props.users[0].data.latitude,
				lng: props.users[0].data.longitude,
			}}
		>
			{props.users.map((user) => (
				<Marker
					key={user.id}
					position={{
						lat: user.data.latitude,
						lng: user.data.longitude,
					}}
				/>
			))}
			{props.mapData && (
				<Circle
					center={center}
					radius={1000}
					strokeColor="#0000FF"
					strokeOpacity={0.8}
					strokeWeight={2}
					fillColor="#0000FF"
					fillOpacity={0.35}
				/>
			)}
			{circles.map((circle) => (
				<Circle
					key={circle.center.latitude + circle.center.longitude}
					center={{
						lat: circle.center.latitude,
						lng: circle.center.longitude,
					}}
					radius={circle.radius}
					strokeColor="#0000FF"
					strokeOpacity={0.8}
					strokeWeight={2}
					fillColor="#0000FF"
					fillOpacity={0.35}
				/>
			))}
		</Map>
	);
};

export default GoogleApiWrapper({
	apiKey: 'AIzaSyCeAX9ldeaRi5HRUJtlkJeDyPzETP4Dmic',
})(MapContainer);
