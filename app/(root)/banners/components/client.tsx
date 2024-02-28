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
import { useEffect, useState } from "react";
import { useSorting } from "@/hooks/general/useSorting";

export const BannerClient = () => {
  const router = useRouter();
  const { limit, onPaginationChange, skip, pagination } = usePagination();
  const { sorting, onSortingChange, field, order } = useSorting();
  const [params, setParams] = useState({
    page: Math.floor(skip / limit) + 1,
    limit,
    columnName: field,
    filterType: order,
    search: ""
  });
  const { data: dataBanner, isPending } = useGetBanners(params);

  const pageCount = dataBanner?.meta?.totalPage || 0;

  const handleFilter = (value: string) => {
    setParams({ ...params, search: value });
  };

  useEffect(() => {
    setParams({
      page: Math.floor(skip / limit) + 1,
      limit: limit,
      columnName: field ?? undefined,
      filterType: order ?? undefined,
      search: params.search
    });
  }, [skip, limit, field, order, params.search]);

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Banner `}
          description="Kelola Banner "
        />
        <Button
          variant={"outlineDanger"}
          className="bg-red-500 text-white border-2 border-black hover:bg-red-500 hover:text-white"
          onClick={() => router.push(`/banners/new`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Tambah Banner Baru
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
        filter={handleFilter}
        sorting={sorting}
        onSortingChange={onSortingChange}
      />

      <Separator />
    </>
  );
};
