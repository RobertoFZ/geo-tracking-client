import axios from 'axios';
import BaseService from "../BaseService";
import { LastLocation, LocationActivity } from "./declarations";

export class LocationService extends BaseService {
  protected url: string | undefined = process.env.REACT_APP_API_URL;
  protected name: string = 'locations';

  async last(): Promise<LastLocation[]> {
    try {
      const response = await axios.get<LastLocation[]>(
        `${this.url}/${this.name}/last`,
        this.getHeaders(),
      );
      return response.data as LastLocation[];
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error(error.message);
      }
    }
  }
}

const service = new LocationService();
export default service;
