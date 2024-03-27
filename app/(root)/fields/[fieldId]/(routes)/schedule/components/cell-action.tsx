"use client";

import { Copy, Edit, Edit2, MoreHorizontal, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import { columns } from "./columns";
import { AlertDialogDelete } from "@/components/shared/alert-delete";
import { useDeleteImageField } from "@/hooks/image-field/useDeleteImageField";
import { useDeleteFile } from "@/hooks/general/useDeleteImage";
import toast from "react-hot-toast";
import { extractFilenameFromURL } from "@/lib/utils";

export const CellAction: React.FC<any> = ({ data }) => {
  console.log(data);
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className="flex justify-center gap-2">
        <Button
          variant={"outlinePrimary"}
          size={"sm"}
          onClick={() => router.push(`/fields/${params.fieldId}/schedule/${data._id}`)}
        >
          <Edit className=" h-4 w-4" />
        </Button>
      </div>
    </>
  );
};
