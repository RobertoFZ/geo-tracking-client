import { compose, withProps } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, Polyline } from 'react-google-maps';
import { Location } from 'api/Location/declarations';
import MarkerIcon from 'assets/marker.png';
import UserInfoBox from './UserInfoBox';
import { ActivityReportRecord } from 'api/Report/declarations';
import { getGoogleMapMarkerWithColor } from 'utils/common';

const lineSymbol = {
  path: 'M 0,-1 0,1',
  strokeOpacity: 1,
  scale: 4
};


const ReportMap: any = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyB1sBPAb7q3Gs3i3mIGgzQL-1DPD_a61x0",
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '100%' }} />,
    mapElement: <div style={{ height: '100%' }} />,
  }),
  withScriptjs,
  withGoogleMap
)(({
  reportRecords = [],
  selectedLocation,
  onCloseInfoBox = () => true,
  onMarkerClick = () => true,
}: any) => {
  const drawPolylines = () => reportRecords.map((record: ActivityReportRecord) => {
    let paths = [];
    for (let i = 0; i < record.locations.length; i++) {
      paths.push({
        lat: Number(record.locations[i].latitude),
        lng: Number(record.locations[i].longitude),
      })
    }
    return <Polyline key={new Date().toISOString()} path={paths} options={{
      strokeColor: record.color ?? '#212121',
      strokeOpacity: 0,
      icons: [{
        icon: lineSymbol,
        offset: '0',
        repeat: '20px'
      }]
    }} />;
  });

  return (
    <GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: 20.770586, lng: -88.963185 }}
    >
      {
        reportRecords.map((record: ActivityReportRecord) => record.locations.map((location: Location) => {
          const setMarkerClick = () => onMarkerClick(location);
          return <Marker
            onClick={setMarkerClick}
            icon={getGoogleMapMarkerWithColor(record.color ?? '#212121')}
            position={{
              lat: Number(location.latitude),
              lng: Number(location.longitude)
            }}>
            {
              selectedLocation &&
              selectedLocation.id === location.id &&
              <UserInfoBox
                date={location.date}
                dateText='Fecha y hora:'
                user={record.user}
                locationZone={record.location_zone}
                onClose={onCloseInfoBox} />
            }
          </Marker>
        }))
      }
      {drawPolylines()}
    </GoogleMap>
  )
});

export default ReportMap;