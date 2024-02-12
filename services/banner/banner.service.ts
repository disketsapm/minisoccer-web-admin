import { BaseResponse } from '@/interfaces/global.interface';
import { RequestAdapter } from '../request-adapter.service';

import { Banner } from '@/interfaces/banner.interface';

export class BannerService extends RequestAdapter {
  constructor() {
    super();
  }
  public async getBanners(): Promise<BaseResponse<Array<Banner>>> {
    try {
      const response = await this.sendPostRequest<object, BaseResponse<Array<Banner>>>(`/banners`, {});

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async createBanner(payload: Banner): Promise<BaseResponse<Banner>> {
    console.log('payload', payload);
    try {
      const response = await this.sendPostRequest<Banner, BaseResponse<Banner>>(`/banner`, payload);
      console.log('response', response);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async deleteBanner(payload: { _id: string }) {
    try {
      const response = await this.sendDeleteRequest<object, string>(`/banner`, payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
