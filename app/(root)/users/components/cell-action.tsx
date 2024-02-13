"use client";

import { Edit } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";

import { UserColumn } from "./columns";
import { AlertDialogDelete } from "@/components/shared/alert-delete";
import { useDeleteUser } from "@/hooks/user/useDeleteUser";

interface CellActionProps {
  data: UserColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const { mutate } = useDeleteUser();

  const onConfirm = () => {
    mutate({
      _id: data?._id
    });
    toast.success("User deleted.");
  };

  return (
    <>
      <div className="flex justify-center gap-2">
        <Button
          variant={"outlinePrimary"}
          size={"sm"}
          onClick={() => {
            router.push(`/users/${data?._id}`);
          }}
        >
          <Edit className=" h-4 w-4" />
        </Button>
        <AlertDialogDelete onAction={onConfirm} />
      </div>
    </>
  );
};
