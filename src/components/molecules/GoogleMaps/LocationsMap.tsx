import { compose, withProps } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { LastLocation } from 'api/Location/declarations';
import MarkerIcon from 'assets/marker.png';
import UserInfoBox from './UserInfoBox';
import { getGoogleMapMarkerWithColor } from 'utils/common';

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
    defaultZoom={8}
    defaultCenter={{ lat: 20.770586, lng: -88.963185 }}
  >
    {
      locations.map((lastLocation: LastLocation) => {
        const setMarkerClick = () => onMarkerClick(lastLocation);
        return lastLocation.location ? <Marker
          onClick={setMarkerClick}
          icon={getGoogleMapMarkerWithColor('#2196F3')}
          position={{
            lat: Number(lastLocation.location.latitude),
            lng: Number(lastLocation.location.longitude)
          }}>
          {
            selectedLocation &&
            selectedLocation.user.id === lastLocation.user.id &&
            <UserInfoBox
              date={lastLocation.location.date}
              user={lastLocation.user}
              locationZone={lastLocation.location_zone}
              onClose={onCloseInfoBox} />
          }
        </Marker> : null;
      })
    }
  </GoogleMap>
);

export default LocationsMap;