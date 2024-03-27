import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ScheduleService } from "@/services/schedule/schedule.service";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export function useUpdateScheduleBoardStatus() {
  const scheduleService = new ScheduleService();
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation<any, string, any>({
    mutationFn: (payload) => scheduleService.updateScheduleBoardStatus(payload),
    onSuccess: () => {
      toast.success("Validated schedule successfully");
      queryClient.invalidateQueries({ queryKey: ["listScheduleBoard"] });
      router.back();
    },
    onError: (error: any) => {
      toast.error(error.message);
    }
  });
}
