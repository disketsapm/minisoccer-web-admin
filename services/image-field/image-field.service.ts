import { BaseResponse } from "@/interfaces/global.interface";
import { RequestAdapter } from "../request-adapter.service";

import { ImageField } from "@/interfaces/image-field.interface";

export class ImageFieldService extends RequestAdapter {
  constructor() {
    super();
  }
  public async getImages(params: any): Promise<BaseResponse<Array<ImageField>>> {
    console.log("params", params);
    try {
      const response = await this.sendGetRequest<BaseResponse<Array<ImageField>>>(
        `/admin/field/image`,
        params
      );

      return response.data;
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  }

  public async createImage(payload: ImageField): Promise<BaseResponse<ImageField>> {
    try {
      const response = await this.sendPostRequest<ImageField, BaseResponse<ImageField>>(
        `/admin/field/image`,
        payload
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async updateImage(payload: any) {
    try {
      const response = await this.sendPutRequest<any, string>(`/admin/field/image`, payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async deleteImage(payload: { filename: string }) {
    try {
      const response = await this.sendDeleteRequest<object, string>(`/admin/field/image`, payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
