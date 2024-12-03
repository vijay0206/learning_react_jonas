import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";

import styles from "./Map.module.css";
import { useCities } from "../contexts/CitiesContext";
import { useGeolocation } from "../hooks/useGeoLocation";
import Button from "./Button";
import useURLPosition from "../hooks/useURLPosition";

function Map() {
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const { cities } = useCities();

  const {
    isLoading: isLocationLoading,
    position: geoLocation,
    getLocation,
  } = useGeolocation();

  const [lat, lng] = useURLPosition();

  useEffect(() => {
    if (lat && lng) setMapPosition([lat, lng]);
  }, [lat, lng]);

  useEffect(() => {
    if (geoLocation) setMapPosition([geoLocation.lat, geoLocation.lng]);
  }, [geoLocation]);

  return (
    <div className={styles.mapContainer}>
      {!geoLocation && (
        <Button type="position" onClick={getLocation}>
          {isLocationLoading ? "Loding..." : "User your position"}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        className={styles.map}
        zoom={6}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function DetectClick() {
  const navigate = useNavigate();

  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;

      navigate(`form?lat=${lat}&lng=${lng}`);
    },
  });

  return null;
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);

  return null;
}

export default Map;
