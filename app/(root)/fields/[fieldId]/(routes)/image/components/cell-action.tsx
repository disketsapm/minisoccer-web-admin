"use client";

import { Copy, Edit, Edit2, MoreHorizontal, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import { ImageFieldColumn } from "./columns";
import { AlertDialogDelete } from "@/components/shared/alert-delete";
import { useDeleteImageField } from "@/hooks/image-field/useDeleteImageField";
import { useDeleteFile } from "@/hooks/general/useDeleteImage";
import toast from "react-hot-toast";
import { extractFilenameFromURL } from "@/lib/utils";

interface CellActionProps {
  data: ImageFieldColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const params = useParams();
  const router = useRouter();
  const { mutateAsync: deleteImageField } = useDeleteImageField();
  const { mutateAsync: deleteFile } = useDeleteFile();
  const onConfirm = async () => {
    const image = extractFilenameFromURL(data?.url || "");

    await deleteFile({ filename: image });
    await deleteImageField({
      _id: params.fieldId,
      assetId: data._id
    });
    toast.success("ImageField deleted.");
  };

  return (
    <>
      <div className="flex justify-center gap-2">
        <Button
          variant={"outlinePrimary"}
          size={"sm"}
          onClick={() => router.push(`/fields/${params.fieldId}/image/${data._id}`)}
        >
          <Edit className=" h-4 w-4" />
        </Button>
        <AlertDialogDelete onAction={onConfirm} />
      </div>
    </>
  );
};
