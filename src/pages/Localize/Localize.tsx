import React, { useEffect, useState } from 'react';
import { WithUserProps } from 'hooks/withUser';
import { RouteComponentProps } from 'react-router-dom';
import MainLayout from 'components/layouts/MainLayout';
import { EMenuKeys } from 'shared/constants/menuElements';
import GoogleMaps from 'components/molecules/GoogleMaps/GoogleMaps';
import showMessage, { NoticeType } from 'utils/notifications';
import LocationService from 'api/Location';
import { LastLocation, LocationActivity } from 'api/Location/declarations';
import LocationZoneService from 'api/LocationZone';
import ZonesSidebar from 'components/molecules/ZonesSidebar';
import GeofencesMap from 'components/molecules/GoogleMaps/GeofencesMap';
import { message } from 'antd';
import { getRandomColor } from 'utils/common';


const LocalizePage: React.FC<WithUserProps & RouteComponentProps> = (props) => {
  let zoneLocationsLoaded = false;
  const updateInterval = 60000; // 1 min
  let mapUpdateTimeout: NodeJS.Timeout;
  let usedColors: string[] = [];
  const [loading, setLoading] = useState(false);
  const [loadingZones, setLoadingZones] = useState(false);
  const [locations, setLocations] = useState<LastLocation[]>([]);
  const [locationActivities, setLocationActivities] = useState<LocationActivity[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<LocationActivity | undefined>(undefined);
  const [selectedZones, setSelectedZones] = useState<LocationActivity[]>([]);

  const getLastLocations = async () => {
    try {
      const locations = await LocationService.last();
      setLocations(locations);
    } catch (error) {
      showMessage('Error', error.message, NoticeType.ERROR);
    }
  }

  const getLocationActivity = async () => {
    try {
      setLoadingZones(true);
      let location_activities = await LocationZoneService.activity();

      location_activities = location_activities.map((location: LocationActivity) => {
        let color = getRandomColor(usedColors);
        location.color = color;
        usedColors.push(color);
        return location;
      });

      zoneLocationsLoaded = true;
      setLocationActivities(location_activities);
      setSelectedZones(location_activities);
      setLoadingZones(false);
    } catch (error) {
      showMessage('Error', error.message, NoticeType.ERROR);
      setLoadingZones(false);
    }
  }

  const initMapUpdate = () => {
    mapUpdateTimeout = setInterval(getLocationActivity, updateInterval);
  }

  const clearSelectedLocation = () => setSelectedLocation(undefined);

  const onMarkerClick = (location: LocationActivity) => {
    if (selectedLocation && selectedLocation.id === location.id) {
      setSelectedLocation(undefined);
    } else {
      setSelectedLocation(location);
    }
  };

  const handleLocationActivitySelection = async (location_activity: LocationActivity) => {
    const hide = message.loading('Actualizando mapa..', 0);
    setLoading(true);
    const activityExist = selectedZones.find(
      (activity) =>
        activity.location_zone.id === location_activity.location_zone.id
    );
    let newSelectedZones: LocationActivity[] = selectedZones;

    if (activityExist !== undefined) {
      newSelectedZones = selectedZones.filter(
        (zone: LocationActivity) =>
          zone.location_zone.id !== location_activity.location_zone.id
      );
    } else {
      newSelectedZones.push(location_activity);
    }
    setSelectedZones([...newSelectedZones]);
    await new Promise((resolve: any) => setTimeout(() => {
      setLoading(false);
      setTimeout(hide, 1000);
      resolve();
    }, 100));
  }

  useEffect(() => {
    getLastLocations();
    initMapUpdate();
    if (!zoneLocationsLoaded) {
      getLocationActivity();
    }
    return () => {
      clearInterval(mapUpdateTimeout);
    };
  }, []);

  return (
    <MainLayout {...props} active={EMenuKeys.LOCATE}>
      <GoogleMaps>
        {
          !loading &&
          <GeofencesMap
            locationZones={selectedZones}
            locations={locations}
            onMarkerClick={onMarkerClick}
            selectedLocation={selectedLocation}
            onCloseInfoBox={clearSelectedLocation}
          />
        }
      </GoogleMaps>
      <ZonesSidebar
        loading={loadingZones}
        locationActivity={locationActivities}
        selectedZones={selectedZones}
        onSelectedZone={handleLocationActivitySelection}
      />
    </MainLayout>
  )
};

export default LocalizePage;