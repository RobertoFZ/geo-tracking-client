import axios from 'axios';
import BaseService from "../BaseService";
import { Response } from "./../BaseService/declarations";
import { User } from "./declarations";

export class UserService extends BaseService<User> {
  protected url: string | undefined = process.env.REACT_APP_API_URL;
  protected name: string = 'user';

  async me(): Promise<User> {
    try {
      const response = await axios.get<Response<User>>(
        `${this.url}/${this.name}/me`,
        this.getHeaders(),
      );
      const { data: axiosData } = response;
      return axiosData.data as User;
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
