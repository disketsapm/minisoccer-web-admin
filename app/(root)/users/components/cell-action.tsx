'use client';

import { Edit } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
// import { AlertModal } from "@/components/modals/alert-modal";

import { UserColumn } from './columns';
import { AlertDialogDelete } from '@/components/shared/alert-delete';
import { useUserId } from '@/store/id-store';
import { useDeleteUser } from '@/hooks/user/useDeleteUser';

interface CellActionProps {
  data: UserColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const { setUserId } = useUserId();

  const router = useRouter();
  const { mutate } = useDeleteUser();

  const onConfirm = async () => {
    await mutate({
      _id: data?._id,
    });
  };

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
        <AlertDialogDelete onAction={onConfirm} />
      </div>
    </>
  );
};
