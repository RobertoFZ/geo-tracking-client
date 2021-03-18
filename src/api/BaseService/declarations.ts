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

export interface PaginatedResponse<T> {
  next: string | null;
  previous: string | null;
  results: T[];
  count: number;
}

export type PaginationData<T> = {
  data: T[];
  count: number;
  page: number;
  offset: number;
  limit: number;
}