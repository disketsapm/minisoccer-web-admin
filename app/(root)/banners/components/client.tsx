"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { columns, BannerColumn } from "./columns";
import { usePagination } from "@/hooks/general/usePagination";
import { useGetBanners } from "@/hooks/banner/useGetBanners";
import { useEffect } from "react";

export const BannerClient = () => {
  const router = useRouter();
  const { limit, onPaginationChange, skip, pagination } = usePagination();

  const { data: dataBanner, mutateAsync, isPending } = useGetBanners();

  const pageCount = dataBanner?.meta?.totalPage || 0;

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
          title={`Banner `}
          description="Manage Banner "
        />
        <Button onClick={() => router.push(`/banners/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable
        columns={columns}
        data={dataBanner?.data || []}
        isLoading={isPending}
        onPaginationChange={onPaginationChange}
        pageCount={pageCount}
        pagination={pagination}
      />

      <Separator />
    </>
  );
};
