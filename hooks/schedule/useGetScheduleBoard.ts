import { useQuery } from "@tanstack/react-query";

import { BaseResponse } from "@/interfaces/global.interface";
import { ScheduleBoardResponse } from "@/interfaces/schedule.interface";
import { ScheduleService } from "@/services/schedule/schedule.service";

export function useGetScheduleBoard(params?: any) {
  const scheduleService = new ScheduleService();
  return useQuery<BaseResponse<Array<ScheduleBoardResponse>>, Error>({
    queryKey: ["listScheduleBoard", params],
    queryFn: () => {
      return scheduleService.getScheduleBoard(params);
    },
    enabled: !!params
  });
}
