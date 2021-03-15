import React from 'react';
import { User } from 'api/User/declarations';
import { LocationZone } from 'api/LocationZone/declarations';
import { InfoWindow } from 'react-google-maps';
import moment from 'moment-timezone';

interface IUserInfoBox {
  user: User;
  locationZone: LocationZone;
  onClose?: () => void;
}

const DATE_FORMAT = 'DD/MM/YY h:mm a'
const UserInfoBox = ({ user, locationZone, onClose }: IUserInfoBox) => (
  <InfoWindow
    onCloseClick={onClose}
  >
    <>
      {user.first_name} {user.last_name} - {locationZone ? locationZone.name : 'Sin zona asignada'} <br />
      Ultima conexión: {user.last_connection ? moment.utc(user.last_connection).format(DATE_FORMAT) : 'No disponible'}
    </>
  </InfoWindow>
);

export default UserInfoBox;