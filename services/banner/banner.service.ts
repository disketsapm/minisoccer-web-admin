import { BaseResponse } from "@/interfaces/global.interface";
import { RequestAdapter } from "../request-adapter.service";

import { Banner } from "@/interfaces/banner.interface";

export class BannerService extends RequestAdapter {
  constructor() {
    super();
  }
  public async getBanners(params: any): Promise<BaseResponse<Array<Banner>>> {
    try {
      const response = await this.sendGetRequest<BaseResponse<Array<Banner>>>(`/banners`, params);

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async getBannerById(payload: { _id: string }): Promise<BaseResponse<Banner>> {
    try {
      const response = await this.sendPostRequest<object, BaseResponse<Banner>>(
        `/banners`,
        payload
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async createBanner(payload: Banner): Promise<BaseResponse<Banner>> {
    console.log("payload", payload);
    try {
      const response = await this.sendPostRequest<Banner, BaseResponse<Banner>>(`/banner`, payload);
      console.log("response", response);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async updateBanner(payload: Banner) {
    try {
      const response = await this.sendPutRequest<Banner, string>(`/banner`, payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async deleteBanner(payload: { filename: string }) {
    try {
      const response = await this.sendDeleteRequest<object, string>(`/banner`, payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async updateActiveBanner(payload: { _id: string; isActive: boolean }) {
    console.log("payload", payload);
    try {
      const response = await this.sendPutRequest<object, string>(`/bannerActive`, payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
