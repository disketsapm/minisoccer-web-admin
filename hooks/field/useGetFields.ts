import { useQuery } from "@tanstack/react-query";
import { FieldService } from "@/services/field/field.service";
import { Field } from "@/interfaces/field.interface";
import { BaseResponse } from "@/interfaces/global.interface";

export function useGetFields(params?: any) {
  const fieldService = new FieldService();
  return useQuery<BaseResponse<Array<Field>>, Error>({
    queryKey: ["listField", params],
    queryFn: () => {
      return fieldService.getFields(params);
    },
    enabled: !!params
  });
}
