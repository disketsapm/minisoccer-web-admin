"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { columns } from "./columns";
import { usePagination } from "@/hooks/general/usePagination";
import { useEffect, useState } from "react";
import { useSorting } from "@/hooks/general/useSorting";
import { FaBackspace } from "react-icons/fa";
import { useGetScheduleBoard } from "@/hooks/schedule/useGetScheduleBoard";

export const ScheduleClient = () => {
  const router = useRouter();
  const pathname = useParams();
  const { limit, onPaginationChange, skip, pagination } = usePagination();
  const { sorting, onSortingChange, field, order } = useSorting();
  const [params, setParams] = useState({
    page: Math.floor(skip / limit) + 1,
    limit,
    columnName: field,
    filterType: order,
    search: "",
    field_id: pathname.fieldId
  });
  const { data: dataSchedule, isPending } = useGetScheduleBoard({
    params
  });

  console.log(dataSchedule);

  const pageCount = dataSchedule?.meta?.totalPage || 0;

  const handleFilter = (value: string) => {
    setParams({ ...params, search: value });
  };

  console.log(params);
  useEffect(() => {
    setParams({
      page: Math.floor(skip / limit) + 1,
      limit: limit,
      columnName: field ?? undefined,
      filterType: order ?? undefined,
      search: params.search,
      field_id: pathname.fieldId
    });
  }, [skip, limit, field, order, params.search]);

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start gap-2">
          <Button
            size={"default"}
            variant={"outline"}
            onClick={() => router.push("/fields")}
          >
            <FaBackspace className="mr-2" />
            Kembali
          </Button>
          <Heading
            title={`Jadwal  `}
            description="Kelola jadwal Lapang "
          />
        </div>

        <Button
          variant={"outlineDanger"}
          className="bg-red-500 text-white border-2 border-black hover:bg-red-500 hover:text-white"
          onClick={() => router.push(`/fields/${pathname.fieldId}/schedule/create`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Tambah jadwal Baru
        </Button>
      </div>
      <Separator />
      <DataTable
        columns={columns}
        // @ts-ignore
        data={dataSchedule?.data || []}
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
