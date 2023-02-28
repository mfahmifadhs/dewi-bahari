import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;


const Map = () => {
    // Sample data for popup content
    const dataLokasi = [
        {
            name: 'Item 1',
        },
        {
            name: 'Item 2',
        },
        {
            name: 'Item 3',
        },
    ];

    // Custom component for rendering popup content
    const PopupContent = ({ data }) => (
        <div>
            {data.map((item, index) => (
                <div key={index}>
                    {item.name}
                </div>
            ))}
        </div>
    );

    const position = [-2.5, 117.0]; // Set the initial position of the map to Indonesia

    return (
        <MapContainer center={position} zoom={5} zoomControl={false} doubleClickZoom={false} maxBounds={[[-11, 95], [6, 141]]} scrollWheelZoom={false} maxBoundsViscosity={1.0} style={{ height: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"  attribution="Map data &copy; OpenStreetMap contributors" />
            {/* <TileLayer url="https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}" attribution="Google Maps" /> */}
            <Marker position={[-6.21462, 106.84513]}>
                <Popup>
                    <PopupContent data={dataLokasi} />
                </Popup>
            </Marker>
            <Marker position={[-8.65097, 115.13748]}>
                <Popup>
                    Bali
                </Popup>
            </Marker>
        </MapContainer>
    );
}

export default Map
