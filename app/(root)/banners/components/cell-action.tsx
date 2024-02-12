'use client';

import { useState } from 'react';
import { Copy, Edit, MoreHorizontal, Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
// import { AlertModal } from "@/components/modals/alert-modal";

import { BannerColumn } from './columns';
import { AlertDialogDelete } from '@/components/shared/alert-delete';
import { useDeletebanner } from '@/hooks/banner/useDeleteBanner';

interface CellActionProps {
  data: BannerColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();

  const { mutate } = useDeletebanner();

  const onConfirm = () => {
    mutate({
      _id: data?._id,
    });
  };

  return (
    <>
      <div className="flex justify-center gap-2">
        <Button
          variant={'outlinePrimary'}
          size={'sm'}
          onClick={() => router.push(`/banners/edit`)}
        >
          <Edit className=" h-4 w-4" />
        </Button>
        <AlertDialogDelete onAction={onConfirm} />
      </div>
    </>
  );
};
