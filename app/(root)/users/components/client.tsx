'use client';

import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

import { columns, UserColumn } from './columns';
import { usePagination } from '@/hooks/general/usePagination';
import { useGetListUser } from '@/hooks/user/useGetListUser';
import { useEffect, useState } from 'react';
import { useSorting } from '@/hooks/general/useSorting';

interface UserClientProps {
  type?: string;
}

export const UsersClient: React.FC<UserClientProps> = ({ type }) => {
  const { limit, onPaginationChange, skip, pagination } = usePagination();
  const { sorting, onSortingChange, field, order } = useSorting();

  const router = useRouter();

  const [params, setParams] = useState({
    page: Math.floor(skip / limit) + 1,
    limit,
    roles: type ?? undefined,
    columnName: field,
    filterType: order,
    search: '',
  });

  const handleFilter = (value: string) => {
    setParams({ ...params, search: value });
  };
  const { data: dataUser, isPending } = useGetListUser(params);

  const pageCount = dataUser?.meta?.totalPage || 0;

  useEffect(() => {
    setParams({
      page: Math.floor(skip / limit) + 1,
      limit: limit,
      roles: type ?? undefined,
      columnName: field ?? undefined,
      filterType: order ?? undefined,
      search: params.search,
    });
  }, [skip, limit, field, order, params.search, type]);

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={type ?? 'All User'}
          description={type ? `list of all ${type}` : 'List of all user'}
        />
        <Button onClick={() => router.push(`/users/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable
        columns={columns}
        data={dataUser?.data || []}
        isLoading={isPending}
        onPaginationChange={onPaginationChange}
        onSortingChange={onSortingChange}
        pageCount={pageCount}
        pagination={pagination}
        sorting={sorting}
        filter={handleFilter}
      />

      <Separator />
    </>
  );
};
