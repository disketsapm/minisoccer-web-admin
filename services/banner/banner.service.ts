import { BaseResponse } from '@/interfaces/global.interface';
import { RequestAdapter } from '../request-adapter.service';

import { Banner } from '@/interfaces/banner.interface';

export class BannerService extends RequestAdapter {
  constructor() {
    super();
  }
  public async getBanners(params: any): Promise<BaseResponse<Array<Banner>>> {
    try {
      const response = await this.sendGetRequest<BaseResponse<Array<Banner>>>(`/admin/banners`, params);

      return response.data;
    } catch (error) {
      console.log('error', error);
      throw error;
    }
  }

  public async createBanner(payload: Banner): Promise<BaseResponse<Banner>> {
    try {
      const response = await this.sendPostRequest<Banner, BaseResponse<Banner>>(`/admin/banner`, payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async updateBanner(payload: Banner) {
    try {
      const response = await this.sendPutRequest<Banner, string>(`/admin/banner`, payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async deleteBanner(payload: { filename: string }) {
    try {
      const response = await this.sendDeleteRequest<object, string>(`/admin/banner`, payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async updateActiveBanner(payload: { _id: string; isActive: boolean }) {
    try {
      const response = await this.sendPutRequest<object, string>(`/admin/bannerActive`, payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
