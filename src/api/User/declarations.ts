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
  on_route: boolean;
  profile: Profile;
  last_connection?: Date;
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

export interface UserActivity extends Model {
  first_name: string;
  last_name: string;
  email: string;
  is_active: boolean;
  on_route: boolean;
  profile: Profile;
  activity: number;
  last_connection: Date;
}
