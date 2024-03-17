"use client";

import { CalendarCheck2, Copy, Edit, Edit2, MoreHorizontal, ImagePlus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import { FieldColumn } from "./columns";
import { AlertDialogDelete } from "@/components/shared/alert-delete";
import { useDeleteField } from "@/hooks/field/useDeleteField";
import toast from "react-hot-toast";

interface CellActionProps {
  data: FieldColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const { mutateAsync: deleteField } = useDeleteField();
  const onConfirm = async () => {
    await deleteField({
      _id: data?._id
    });
    toast.success("Field deleted.");
  };

  return (
    <>
      <div className="flex justify-center gap-2">
        <Button
          variant={"outlinePrimary"}
          size={"sm"}
          onClick={() => router.push(`/fields/${data?._id}/schedule`)}
        >
          <CalendarCheck2 className=" h-4 w-4" />
        </Button>
        <Button
          variant={"outlinePrimary"}
          size={"sm"}
          onClick={() => router.push(`/fields/${data?._id}/image`)}
        >
          <ImagePlus className=" h-4 w-4" />
        </Button>
        <Button
          variant={"outlinePrimary"}
          size={"sm"}
          onClick={() => router.push(`/fields/${data?._id}`)}
        >
          <Edit className=" h-4 w-4" />
        </Button>
        <AlertDialogDelete onAction={onConfirm} />
      </div>
    </>
  );
};
