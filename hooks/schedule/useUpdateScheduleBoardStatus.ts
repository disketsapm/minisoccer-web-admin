import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ScheduleService } from "@/services/schedule/schedule.service";
import toast from "react-hot-toast";

export function useUpdateScheduleBoardStatus() {
  const scheduleService = new ScheduleService();
  const queryClient = useQueryClient();
  return useMutation<any, string, any>({
    mutationFn: (payload) => scheduleService.updateScheduleBoardStatus(payload),
    onSuccess: () => {
      toast.success("Validated schedule successfully");
      queryClient.invalidateQueries({ queryKey: ["listScheduleBoard"] });
    },
    onError: (error: any) => {
      toast.error(error.message);
    }
  });
}
