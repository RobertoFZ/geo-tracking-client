import { Model } from "api/BaseService/declarations";

export enum EUserRoles {
  ADMIN = 'admin',
  DRIVER = 'driver',
}

export interface User extends Model {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  role: EUserRoles;
  is_active: boolean
  token: string;
  profile: Profile;
}

export interface Profile extends Model {
  locale: string;
}

export type UsersPaginated = {
  data: User[];
  count: number;
}


export interface UserProfile extends Model {
  user: User;
  profile: Profile;
}