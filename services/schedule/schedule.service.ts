import { BaseResponse } from "@/interfaces/global.interface";
import { RequestAdapter } from "../request-adapter.service";

import { ScheduleBoardResponse } from "@/interfaces/schedule.interface";

export class ScheduleService extends RequestAdapter {
  constructor() {
    super();
  }
  public async getScheduleBoard(params: any): Promise<BaseResponse<Array<ScheduleBoardResponse>>> {
    try {
      const response = await this.sendGetRequest<BaseResponse<Array<ScheduleBoardResponse>>>(
        `/admin/schedule/board`,
        params
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async getSchedule(params: any): Promise<BaseResponse<Array<ScheduleBoardResponse>>> {
    try {
      const response = await this.sendGetRequest<BaseResponse<Array<ScheduleBoardResponse>>>(
        `/admin/schedule`,
        params
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async createScheduleBoard(
    payload: ScheduleBoardResponse
  ): Promise<BaseResponse<ScheduleBoardResponse>> {
    try {
      const response = await this.sendPostRequest<
        ScheduleBoardResponse,
        BaseResponse<ScheduleBoardResponse>
      >(`/admin/schedule`, payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async updateSchedule(
    payload: ScheduleBoardResponse
  ): Promise<BaseResponse<ScheduleBoardResponse>> {
    try {
      const response = await this.sendPutRequest<
        ScheduleBoardResponse,
        BaseResponse<ScheduleBoardResponse>
      >(`/admin/schedule`, payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
