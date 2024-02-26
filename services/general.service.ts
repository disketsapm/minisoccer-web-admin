import { RequestAdapter } from './request-adapter.service';

type FileUpload = {
  file: any;
  type: string;
};
export class GeneralService extends RequestAdapter {
  constructor() {
    super();
  }

  public async uploadFile({ file, type }: FileUpload) {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await this.sendPostRequest<any, any>(
        `/admin/file`,
        formData,
        {},
        {
          //@ts-ignore
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async deleteFile(payload: { filename: string }) {
    try {
      const response = await this.sendDeleteRequest<object, string>(`/admin/file`, payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
