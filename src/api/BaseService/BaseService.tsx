import { getToken } from 'utils/token';
class BaseService {
  protected url: string | undefined = process.env.REACT_APP_API_URL;

  protected getHeaders() {
    return {
      headers: {
        Authorization: `Token ${getToken()}`,
      }
    }
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
