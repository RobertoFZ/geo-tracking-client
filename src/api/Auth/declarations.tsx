import { Model } from 'api/BaseService/declarations';
import { BaseResponse } from '../BaseService/declarations';
import { User, Profile } from '../User/declarations';

export interface AuthRequest {
  email: string;
  password: string;
}

export interface AuthResponse extends BaseResponse {
  token: {
    token: string;
    expires: number;
    expires_in: number;
  };
  refresh_token: {
    token: string;
    expires: number;
    expires_in: number;
  };
  user: User;
  profile: Profile;
};

export interface UserProfile extends Model {
  user: User,
  profile: Profile,
}