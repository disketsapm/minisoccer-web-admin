"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { columns } from "./columns";
import { usePagination } from "@/hooks/general/usePagination";
import { useGetImageFields } from "@/hooks/image-field/useGetImageFields";
import { useEffect, useState } from "react";
import { useSorting } from "@/hooks/general/useSorting";
import { FaBackspace } from "react-icons/fa";

export const ImageFieldClient = () => {
  const router = useRouter();
  const pathname = useParams();
  const { limit, onPaginationChange, skip, pagination } = usePagination();
  const { sorting, onSortingChange, field, order } = useSorting();
  const [params, setParams] = useState({
    _id: pathname.fieldId
  });

  const { data: dataImageField, isPending } = useGetImageFields(params);

  const pageCount = dataImageField?.meta?.totalPage || 0;

  const handleFilter = (value: string) => {
    // @ts-ignore
    setParams({});
  };

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
            title={`Gambar  `}
            description="Kelola Gambar Lapang "
          />
        </div>

        <Button
          variant={"outlineDanger"}
          className="bg-red-500 text-white border-2 border-black hover:bg-red-500 hover:text-white"
          onClick={() => router.push(`/fields/${pathname.fieldId}/image/new`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Tambah Gambar Baru
        </Button>
      </div>
      <Separator />
      <DataTable
        columns={columns}
        // @ts-ignore
        data={dataImageField?.data?.assets || []}
        isLoading={isPending}
        onPaginationChange={onPaginationChange}
        pageCount={pageCount}
        pagination={pagination}
        filter={handleFilter}
        sorting={sorting}
        onSortingChange={onSortingChange}
        isImageField
      />

      <Separator />
    </>
  );
};
