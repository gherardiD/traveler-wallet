import styles from "./Map.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useCities } from "../contexts/CitiesContext";
import { useGeolocation } from "../hooks/useGeolocation";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Button from "./Button";

function Map() {
  const [mapPosition, setMapPosition] = useState([45.780716, 9.622076]);
  const { cities } = useCities();
  const {
    position: currentUserPosition,
    isLoading: isCurrentUserPositionLoading,
    getPosition: getCurrentUserPosition,
  } = useGeolocation();
  
  // Update the map position when the url changes
  const [mapLat, mapLng] = useUrlPosition();
  useEffect(() => {
    if (mapLat && mapLng) {
      setMapPosition([parseFloat(mapLat), parseFloat(mapLng)]);
    }
  }, [mapLat, mapLng]);

  // Update the map position when the user position is available
  useEffect(() => {
    if (currentUserPosition) {
      setMapPosition([currentUserPosition.lat, currentUserPosition.lng]);
    }
  }, [currentUserPosition]);

  return (
    <div className={styles.mapContainer}>
      {!currentUserPosition && (
        <Button type="position" onClick={getCurrentUserPosition}>
          {isCurrentUserPositionLoading ? "Loading..." : "Use your position"}
        </Button>
      )}
      
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city._id}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}

        <ChangeMapCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

// eslint-disable-next-line react/prop-types
function ChangeMapCenter({ position }) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();

  useMapEvent("click", (e) => {
    navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
  });
}

export default Map;
