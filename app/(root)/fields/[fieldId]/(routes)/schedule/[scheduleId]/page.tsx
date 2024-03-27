"use client";

import { ScheduleForm } from "./components/schedule-form";
import { useGetScheduleBoard } from "@/hooks/schedule/useGetScheduleBoard";

const ImageFieldPage = ({ params }: { params: { fieldId: string; imageId: string } }) => {
  const { data, isPending } = useGetScheduleBoard({ _id: params.fieldId, assetId: params.imageId });
  console.log(params);
  console.log(data);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ScheduleForm data={params} />
      </div>
    </div>
  );
};

export default ImageFieldPage;
