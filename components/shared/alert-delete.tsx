import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Edit, Trash } from 'lucide-react';
import { FaTrashAlt } from 'react-icons/fa';

interface AlertDialogDelete {
  onAction?: () => void;
}

export function AlertDialogDelete({ onAction }: AlertDialogDelete) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant={'outlineDanger'}
          size={'sm'}
        >
          <Trash className=" h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Apakah Anda Yakin?</AlertDialogTitle>
          <AlertDialogDescription>Aksi ini tidak dapat diurungkan. Data yang dihapus tidak dapat dikembalikan.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batalkan</AlertDialogCancel>
          <AlertDialogAction onClick={onAction}>
            <Button
              variant="destructive"
              className="gap-2"
            >
              Hapus
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
