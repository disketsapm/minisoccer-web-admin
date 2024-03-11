import { BaseResponse } from '@/interfaces/global.interface';
import { RequestAdapter } from '../request-adapter.service';

import { Image } from '@/interfaces/Image.interface';

export class ImageService extends RequestAdapter {
  constructor() {
    super();
  }
  public async getImages(params: any): Promise<BaseResponse<Array<Image>>> {
    try {
      const response = await this.sendGetRequest<BaseResponse<Array<Image>>>(`/admin/field/image`, params);

      return response.data;
    } catch (error) {
      console.log('error', error);
      throw error;
    }
  }

  public async createImage(payload: Image): Promise<BaseResponse<Image>> {
    try {
      const response = await this.sendPostRequest<Image, BaseResponse<Image>>(`/admin/field/image`, payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async updateImage(payload: Image) {
    try {
      const response = await this.sendPutRequest<Image, string>(`/admin/field/image`, payload);
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
