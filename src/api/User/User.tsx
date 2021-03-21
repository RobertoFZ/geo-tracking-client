import axios from 'axios';
import BaseService from "../BaseService";
import { PaginatedResponse, PaginationData, Response } from "./../BaseService/declarations";
import { User } from "./declarations";

export class UserService extends BaseService<User> {
  protected url: string | undefined = process.env.REACT_APP_API_URL;
  protected name: string = 'users';

  async find(paginationData: PaginationData<User>): Promise<PaginatedResponse<User>> {
    try {
      const response = await axios.get<PaginatedResponse<User>>(
        `${this.url}/${this.name}/`,
        this.getHeaders(paginationData),
      );
      return response.data as PaginatedResponse<User>;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error(error.message);
      }
    }
  }
}

const service = new UserService();
export default service;
