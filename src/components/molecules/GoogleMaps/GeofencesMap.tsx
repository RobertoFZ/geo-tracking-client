import { compose, withProps } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Polygon, Marker } from 'react-google-maps';
import { LastLocation, LocationActivity } from 'api/Location/declarations';
import MarkerIcon from 'assets/marker.png';
import UserInfoBox from './UserInfoBox';
import { getGoogleMapMarkerWithColor } from 'utils/common';
import { LocationZone } from 'api/LocationZone/declarations';

const GeofencesMap: any = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyB1sBPAb7q3Gs3i3mIGgzQL-1DPD_a61x0",
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '100%' }} />,
    mapElement: <div style={{ height: '100%' }} />,
  }),
  withScriptjs,
  withGoogleMap
)(({
  locationZones,
  locations,
  onMarkerClick,
  selectedLocation,
  onCloseInfoBox
}: any) => {
  const displayGeofences = (location_activities: LocationActivity[]) => {
    return location_activities.map((location_activity: LocationActivity, index) => {
      let { location_zone } = location_activity;
      let path = [];
      for (let i = 0; i < location_zone.points.length; i++) {
        path.push({
          lat: Number(location_zone.points[i].latitude),
          lng: Number(location_zone.points[i].longitude),
        });
      }

      let polygonProps = {
        strokeColor: location_activity.color ?? '#212121',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: location_activity.color ?? '#212121',
        fillOpacity: 0.35,
      };
      return <Polygon key={location_zone.id} path={path} options={polygonProps} />
    });
  };

  const findColorByLocationZone = (location: LastLocation) => {
    const location_zone = locationZones.find(
      (location_activity: LocationActivity) =>
        location_activity.location_zone.id === location.location_zone.id
    );
    return location_zone ? location_zone.color ?? '#212121' : '#212121';
  }

  return (
    <GoogleMap
      defaultZoom={13}
      defaultCenter={{ lat: 20.976829, lng: -89.619143 }}
    >
      {displayGeofences(locationZones)}
      {
        locations.map((lastLocation: LastLocation) => {
          const setMarkerClick = () => onMarkerClick(lastLocation);
          return lastLocation.location ? <Marker
            onClick={setMarkerClick}
            icon={getGoogleMapMarkerWithColor(findColorByLocationZone(lastLocation))}
            position={{
              lat: Number(lastLocation.location.latitude),
              lng: Number(lastLocation.location.longitude)
            }}>
            {
              selectedLocation &&
              selectedLocation.user.id === lastLocation.user.id &&
              <UserInfoBox
                date={lastLocation.user.last_connection}
                user={lastLocation.user}
                locationZone={lastLocation.location_zone}
                onClose={onCloseInfoBox} />
            }
          </Marker> : null;
        })
      }
    </GoogleMap>
  )
}
);

export default GeofencesMap;