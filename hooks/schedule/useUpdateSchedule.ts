import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ScheduleService } from "@/services/schedule/schedule.service";
import toast from "react-hot-toast";

export function useUpdateSchedule() {
  const scheduleService = new ScheduleService();
  const queryClient = useQueryClient();
  return useMutation<any, string, any>({
    mutationFn: (payload) => scheduleService.updateSchedule(payload),
    onSuccess: () => {
      toast.success("Schedule added successfully");
      queryClient.invalidateQueries({ queryKey: ["listSchedule"] });
    },
    onError: (error: any) => {
      toast.error(error.message);
    }
  });
}
