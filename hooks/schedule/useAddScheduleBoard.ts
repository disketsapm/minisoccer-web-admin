import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ScheduleService } from "@/services/schedule/schedule.service";
import toast from "react-hot-toast";

export function useAddScheduleBoard() {
  const imageService = new ScheduleService();
  const queryClient = useQueryClient();
  return useMutation<any, string, any>({
    mutationFn: (payload) => imageService.createScheduleBoard(payload),
    onSuccess: () => {
      toast.success("Schedule added successfully");
      queryClient.invalidateQueries({ queryKey: ["listScheduleBoard"] });
    },
    onError: (error: any) => {
      toast.error(error.message);
    }
  });
}
