import { BaseResponse } from "@/interfaces/global.interface";
import { RequestAdapter } from "../request-adapter.service";

import { Field } from "@/interfaces/field.interface";

export class FieldService extends RequestAdapter {
  constructor() {
    super();
  }
  public async getFields(params: any): Promise<BaseResponse<Array<Field>>> {
    try {
      const response = await this.sendGetRequest<BaseResponse<Array<Field>>>(
        `/admin/field`,
        params
      );

      return response.data;
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  }

  public async createField(payload: Field): Promise<BaseResponse<Field>> {
    try {
      const response = await this.sendPostRequest<Field, BaseResponse<Field>>(
        `/admin/field`,
        payload
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async updateField(payload: Field) {
    try {
      const response = await this.sendPutRequest<Field, string>(`/admin/field`, payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async deleteField(payload: { filename: string }) {
    try {
      const response = await this.sendDeleteRequest<object, string>(`/admin/field`, payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async updateActiveField(payload: { _id: string; isActive: boolean }) {
    try {
      const response = await this.sendPutRequest<object, string>(`/admin/fieldActive`, payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
