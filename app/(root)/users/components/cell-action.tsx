'use client';

import { useState } from 'react';
import { Copy, Edit, MoreHorizontal, Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
// import { AlertModal } from "@/components/modals/alert-modal";

import { UserColumn } from './columns';
import { AlertDialogDelete } from '@/components/shared/alert-delete';
import { useUserId } from '@/store/id-store';

interface CellActionProps {
  data: UserColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const { setUserId } = useUserId();

  const router = useRouter();

  const onConfirm = () => {};

  return (
    <>
      <div className="flex justify-center gap-2">
        <Button
          variant={'outlinePrimary'}
          size={'sm'}
          onClick={() => {
            setUserId(data?._id);
            router.push(`/users/edit`);
          }}
        >
          <Edit className=" h-4 w-4" />
        </Button>
        <AlertDialogDelete onAction={() => console.log(data?.fullname)} />
      </div>
    </>
  );
};
