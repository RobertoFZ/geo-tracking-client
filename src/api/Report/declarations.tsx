import { PaginatedResponse } from "api/BaseService/declarations";
import { Location } from "api/Location/declarations";
import { LocationZone } from "api/LocationZone/declarations";
import { User } from "api/User/declarations";

export interface ActivityReportRequest {
  from: Date;
  to: Date;
  zone_id: number;
}

export interface ActivityReportRecord {
  color?: string;
  locations: Location[];
  location_zone: LocationZone;
  user: User;
  from: string;
  to: string;
  time: number; // Minutes
}

export interface PaginatedReport extends PaginatedResponse<ActivityReportRecord> {

}