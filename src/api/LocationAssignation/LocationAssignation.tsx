import axios from 'axios';
import BaseService from "../BaseService";
import { LocationAssignation } from "./declarations";


export class LocationAssignationService extends BaseService<LocationAssignation> {
  protected url: string | undefined = process.env.REACT_APP_API_URL;
  protected name: string = 'location_assignations';

  async find(data: LocationAssignation[]): Promise<LocationAssignation[]> {
    try {
      const response = await axios.post<LocationAssignation[]>(
        `${this.url}/${this.name}/`,
        data,
        this.getHeaders(),
      );
      return response.data as LocationAssignation[];
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error(error.message);
      }
    }
  }

  async create(data: LocationAssignation): Promise<LocationAssignation> {
    try {
      const response = await axios.post<LocationAssignation>(
        `${this.url}/${this.name}/`,
        data,
        this.getHeaders(),
      );
      return response.data as LocationAssignation;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error(error.message);
      }
    }
  }

  async delete(assignation: LocationAssignation): Promise<boolean> {
    try {
      await axios.delete<LocationAssignation>(
        `${this.url}/${this.name}/${assignation.id!}/`,
        this.getHeaders(),
      );
      return true
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error(error.message);
      }
    }
  }
}

const service = new LocationAssignationService();
export default service;
