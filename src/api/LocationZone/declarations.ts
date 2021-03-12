import { Model } from "api/BaseService/declarations";

export interface LocationZonePoint extends Model {
  longitude: string;
  latitude: string;
  order: number;
}

export interface LocationZone extends Model {
  name: string;
  points: LocationZonePoint[];
}
