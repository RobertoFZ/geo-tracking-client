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
  user: User;
  location: Location;
}

export interface LocationActivity extends Model {
  location_zone: LocationZone;
  users: UserActivity[]
}
