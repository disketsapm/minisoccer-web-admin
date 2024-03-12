"use client";

import { ImageForm } from "./components/image-form";
import { useGetImageFields } from "@/hooks/image-field/useGetImageFields";

const ImageFieldPage = ({ params }: { params: { fieldId: string; imageId: string } }) => {
  const { data, isPending } = useGetImageFields({ _id: params.fieldId, assetId: params.imageId });
  console.log(params);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ImageForm data={params.imageId !== "new" ? (data?.data as object) ?? null : null} />
      </div>
    </div>
  );
};

export default ImageFieldPage;
