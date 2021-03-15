import { Model } from "api/BaseService/declarations";
import { LocationZone } from "api/LocationZone/declarations";
import { User, UserActivity } from "api/User/declarations";

export interface Location extends Model {
  id: number;
  user_id: number;
  date: Date;
  latitude: string;
  longitude: string;
}

export interface LastLocation extends Model {
  color?: string;
  user: User;
  location: Location;
  location_zone: LocationZone;
}

export interface LocationActivity extends Model {
  color?: string;
  location_zone: LocationZone;
  users: UserActivity[]
}
