/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */

import { Map, GoogleApiWrapper, Marker, Circle } from 'google-maps-react';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/init-firebase';

function checkIfOutsideCircle(user, center, radius, google) {
	const distance = google.maps.geometry.spherical.computeDistanceBetween(
		new google.maps.LatLng(user.data.latitude, user.data.longitude),
		new google.maps.LatLng(center.lat, center.lng),
	);
	return distance > radius;
}

const MapContainer = (props) => {
	const [circles, setCircles] = useState([]);
	const [outsideUsers, setOutsideUsers] = useState([]);

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

	const radius = 1000;
	const center = props.mapData
		? {
				lat: parseFloat(props.mapData.latitude),
				lng: parseFloat(props.mapData.longitude),
		  }
		: {};

	useEffect(() => {
		const newOutsideUsers = props.users.filter((user) =>
			checkIfOutsideCircle(user, center, radius, props.google),
		);
		setOutsideUsers(newOutsideUsers);
	}, [props.users]);

	return (
		<>
			<div>
				{outsideUsers.map((user) => (
					<p key={user.id}>{user.id} is outside the circle</p>
				))}
			</div>

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
						onMouseover={() => {
							console.log(user.data.latitude);
						}}
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
		</>
	);
};

export default GoogleApiWrapper({
	apiKey: 'AIzaSyCeAX9ldeaRi5HRUJtlkJeDyPzETP4Dmic',
	libraries: ['geometry'],
})(MapContainer);
