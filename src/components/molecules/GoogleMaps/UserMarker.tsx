import { User } from 'api/User/declarations';
import MarkerImage from 'components/atoms/MarkerImage';
import Marker from 'assets/marker.png';

interface IUserMarker {
  lat: number;
  lng: number;
  user: User;
}

const UserMarker = ({
  user
}: IUserMarker) => (
  <div>
    <MarkerImage src={Marker} />
  </div>
);

export default UserMarker;