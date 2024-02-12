import { BaseResponse } from '@/interfaces/global.interface';
import { RequestAdapter } from '../request-adapter.service';

import { Banner } from '@/interfaces/banner.interface';

export class BannerService extends RequestAdapter {
  constructor() {
    super();
  }
  public async getBanners(payload?: any | null): Promise<BaseResponse<Array<Banner>>> {
    try {
      const response = await this.sendPostRequest<Banner, BaseResponse<Array<Banner>>>(`/banners`, payload);

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
}
