import "leaflet/dist/leaflet.css";
import {
  MapContainer as LeafletMap,
  TileLayer,
  Marker,
  Popup,
  Circle,
} from "react-leaflet";

const Map = ({ locations }) => {
  return (
    <LeafletMap
      center={{
        lat: locations.coordinates.lat,
        lng: locations.coordinates.lng,
      }}
      style={{ height: 400, width: "100%" }}
      zoom={13}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        position={[locations.coordinates.lat, locations.coordinates.lng]}
      ></Marker>
      <Circle
        center={[locations.coordinates.lat, locations.coordinates.lng]}
        color={"#CC1034"}
        fillColor={"#CC1034"}
        fillOpacity={0.4}
        radius={100}
      >
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Circle>
    </LeafletMap>
  );
};

export default Map;
