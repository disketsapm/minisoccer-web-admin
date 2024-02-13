"use client";

import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import { BannerColumn } from "./columns";
import { AlertDialogDelete } from "@/components/shared/alert-delete";
import { useDeletebanner } from "@/hooks/banner/useDeleteBanner";
import { useDeleteFile } from "@/hooks/general/useDeleteImage";
import toast from "react-hot-toast";
import { extractFilenameFromURL } from "@/lib/utils";

interface CellActionProps {
  data: BannerColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const { mutateAsync: deleteBanner } = useDeletebanner();
  const { mutateAsync: deleteFile } = useDeleteFile();
  const onConfirm = async () => {
    const filename = extractFilenameFromURL(data?.image);
    await deleteFile({ filename: filename });
    await deleteBanner({
      _id: data?._id
    });
    toast.success("Banner deleted.");
  };

  return (
    <>
      <div className="flex justify-center gap-2">
        <Button
          variant={"outlinePrimary"}
          size={"sm"}
          onClick={() => router.push(`/banners/${data?._id}`)}
        >
          <Edit className=" h-4 w-4" />
        </Button>
        <AlertDialogDelete onAction={onConfirm} />
      </div>
    </>
  );
};
