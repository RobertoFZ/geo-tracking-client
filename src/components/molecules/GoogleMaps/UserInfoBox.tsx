import React from 'react';
import { User } from 'api/User/declarations';
import InfoBox from 'react-google-maps/lib/components/addons/InfoBox';
import { Tag } from 'antd';
import { LocationZone } from 'api/LocationZone/declarations';
import { InfoWindow } from 'react-google-maps';

interface IUserInfoBox {
  user: User;
  locationZone: LocationZone;
  onClose?: () => void;
}

const UserInfoBox = ({ user, locationZone, onClose }: IUserInfoBox) => (
  <InfoWindow
    onCloseClick={onClose}
  >
    <>
      {user.first_name} {user.last_name} - {locationZone ? locationZone.name : 'Sin zona asignada'}
    </>
  </InfoWindow>
);

export default UserInfoBox;