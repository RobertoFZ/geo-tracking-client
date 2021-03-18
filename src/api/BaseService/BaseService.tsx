import { AxiosRequestConfig } from 'axios';
import { getToken } from 'utils/token';
import { PaginationData } from './declarations';
class BaseService<T> {
  protected url: string | undefined = process.env.REACT_APP_API_URL;

  protected getHeaders(paginationData?: PaginationData<T>) {
    let config: AxiosRequestConfig = {
      headers: {
        Authorization: `Token ${getToken()}`,
      }
    }
    if (paginationData) {
      config.params = {
        limit: paginationData.limit,
        offset: paginationData.limit * (paginationData.page - 1),
      }
    }
    return config;
  }
  protected getHeadersMultipart() {
    return {
      headers: {
        'authorization': `Token ${getToken()}`,
        'content-type': 'multipart/form-data'
      }
    }
  }
}
export default BaseService;
