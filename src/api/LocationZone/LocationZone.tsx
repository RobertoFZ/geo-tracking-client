import { LocationActivity } from 'api/Location/declarations';
import axios from 'axios';
import BaseService from "../BaseService";
import { LocationZone } from "./declarations";

export class LocationZoneService extends BaseService<LocationZone> {
  protected url: string | undefined = process.env.REACT_APP_API_URL;
  protected name: string = 'location_zones';

  async all(): Promise<LocationZone[]> {
    try {
      const response = await axios.get<LocationZone[]>(
        `${this.url}/${this.name}/`,
        this.getHeaders(),
      );
      return response.data as LocationZone[];
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error(error.message);
      }
    }
  }

  async activity(): Promise<LocationActivity[]> {
    try {
      const response = await axios.get<LocationActivity[]>(
        `${this.url}/${this.name}/activity`,
        this.getHeaders(),
      );
      return response.data as LocationActivity[];
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error(error.message);
      }
    }
  }
}

const service = new LocationZoneService();
export default service;
