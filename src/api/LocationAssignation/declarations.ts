import { LocationZone } from "api/LocationZone/declarations";
import { User } from "api/User/declarations";

export interface LocationAssignation {
  id?: number;
  user_id: number;
  location_zone_id: number;
  user: User;
  location_zone?: LocationZone;
}
