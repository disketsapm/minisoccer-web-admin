'use client';

import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

import { columns, UserColumn } from './columns';

interface UserClientProps {
  data: UserColumn[];
}

export const UsersClient: React.FC<UserClientProps> = ({ data }) => {
  const params = useParams();
  const router = useRouter();

  console.log(data);
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`User (${data.length})`}
          description="Manage user "
        />
        <Button onClick={() => router.push(`/users/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable
        searchKey="username"
        columns={columns}
        data={data}
      />

      <Separator />
    </>
  );
};
