"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { columns, UserColumn } from "./columns";
import { usePagination } from "@/hooks/general/usePagination";
import { useGetListUser } from "@/hooks/user/useGetListUser";
import { useEffect } from "react";

interface UserClientProps {
  type?: string;
}

export const UsersClient: React.FC<UserClientProps> = ({ type }) => {
  const { limit, onPaginationChange, skip, pagination } = usePagination();
  const router = useRouter();

  const { data: dataUser, mutateAsync, isPending } = useGetListUser();

  const pageCount = dataUser?.meta?.totalPage || 0;

  useEffect(() => {
    mutateAsync({
      page: skip / limit + 1,
      limit: limit
    });
  }, [skip, limit, mutateAsync]);

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={type === "admin" ? "Admin User" : "All User"}
          description={type === "admin" ? "List of admin user" : "List of all user"}
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
        pageCount={pageCount}
        pagination={pagination}
      />

      <Separator />
    </>
  );
};
