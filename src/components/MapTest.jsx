/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const MapContainer = (props) => {
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
		</Map>
	);
};
export default GoogleApiWrapper({
	apiKey: 'AIzaSyCeAX9ldeaRi5HRUJtlkJeDyPzETP4Dmic',
})(MapContainer);
