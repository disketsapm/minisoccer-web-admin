"use client";

import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import { FieldColumn } from "./columns";
import { AlertDialogDelete } from "@/components/shared/alert-delete";
import { useDeleteField } from "@/hooks/banner/useDeleteBanner";
import toast from "react-hot-toast";

interface CellActionProps {
  data: FieldColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const { mutateAsync: deleteBanner } = useDeleteField();
  const onConfirm = async () => {
    await deleteBanner({
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
          onClick={() => router.push(`/fields/${data?._id}`)}
        >
          <Edit className=" h-4 w-4" />
        </Button>
        <AlertDialogDelete onAction={onConfirm} />
      </div>
    </>
  );
};
