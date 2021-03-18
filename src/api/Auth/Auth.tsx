import { User } from 'api/User/declarations';
import axios from 'axios';
import BaseService from '../BaseService/BaseService';
import { Response } from '../BaseService/declarations';
import { AuthResponse } from './declarations';

export class AuthService extends BaseService<User> {
  protected name = 'auth';

  async login(email: string, password: string): Promise<User> {
    try {
      const response = await axios.post<User>(`${this.url}/${this.name}/login`, {
        username: email, password
      });
      const { data: axiosData } = response;
      return axiosData as User;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error(error.message);
      }
    }
  }

  async logout(): Promise<void> {
    try {
      await axios.post(`${this.url}/${this.name}/logout`, {}, this.getHeaders());
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error(error.message);
      }
    }
  }

}

const service = new AuthService();
export default service;
