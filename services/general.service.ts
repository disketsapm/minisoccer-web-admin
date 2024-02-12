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
      formData.append('type', type);

      const response = await this.sendPostRequest<any, any>(`/file`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
