import { compose, withProps } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { LastLocation } from 'api/Location/declarations';
import MarkerIcon from 'assets/marker.png';
import UserInfoBox from './UserInfoBox';

const LocationsMap: any = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyB1sBPAb7q3Gs3i3mIGgzQL-1DPD_a61x0",
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '100%' }} />,
    mapElement: <div style={{ height: '100%' }} />,
  }),
  withScriptjs,
  withGoogleMap
)(({
  locations,
  selectedLocation,
  onCloseInfoBox = () => true,
  onMarkerClick = () => true,
}: any) =>
  <GoogleMap
    defaultZoom={13}
    defaultCenter={{ lat: 20.976829, lng: -89.619143 }}
  >
    {
      locations.map((lastLocation: LastLocation) => {
        const setMarkerClick = () => onMarkerClick(lastLocation);
        return <Marker
          onClick={setMarkerClick}
          icon={MarkerIcon}
          position={{
            lat: Number(lastLocation.location.latitude),
            lng: Number(lastLocation.location.longitude)
          }}>
          {
            selectedLocation &&
            selectedLocation.user.id === lastLocation.user.id &&
            <UserInfoBox
              user={lastLocation.user}
              locationZone={lastLocation.location_zone}
              onClose={onCloseInfoBox} />
          }
        </Marker>
      })
    }
  </GoogleMap>
);

export default LocationsMap;