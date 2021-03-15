import axios from 'axios';
import BaseService from "../BaseService";
import { ActivityReportRecord, ActivityReportRequest } from "./declarations";

export class ReportService extends BaseService {
  protected url: string | undefined = process.env.REACT_APP_API_URL;
  protected name: string = 'reports';

  async activity(data: ActivityReportRequest): Promise<ActivityReportRecord[]> {
    try {
      const response = await axios.post<ActivityReportRecord[]>(
        `${this.url}/${this.name}/`,
        data,
        this.getHeaders(),
      );
      return response.data as ActivityReportRecord[];
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error(error.message);
      }
    }
  }
}

const service = new ReportService();
export default service;
