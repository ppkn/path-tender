import { Marker, MapContainer, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import '~/styles/map.scss'


export default function Component({ entry }) {
	return (
    <MapContainer center={[entry.latitude, entry.longitude]} zoom={13} scrollWheelZoom={false} style={{ height: '500px', width: '500px'}}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[entry.latitude, entry.longitude]}>
        { entry.notes && <Popup>
          { entry.notes }
          </Popup>}
      </Marker>
    </MapContainer>
	);
}