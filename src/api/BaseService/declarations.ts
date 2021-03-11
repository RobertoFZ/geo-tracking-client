export interface Model {
  id?: number;
  [prop: string]: any;
}

export interface Response<T extends Model> {
  status: number;
  message: string;
  data: T[] | T;
}
export interface BaseResponse {
  status: number;
  message: string;
}