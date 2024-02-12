import { useMutation } from '@tanstack/react-query';
import { GeneralService } from '@/services/general.service';

export function useUploadImage() {
  const generalService = new GeneralService();
  return useMutation<any, string, any>({
    mutationFn: (payload) => generalService.uploadFile(payload),
  });
}
