"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";
import { Banner } from "@/interfaces/banner.interface";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useUpdateActiveBanner } from "@/hooks/banner/useUpdateActiveBanner";

export type BannerColumn = Banner;

const StatusSelect = ({ isActive, _id }: any) => {
  const { mutateAsync } = useUpdateActiveBanner();
  const updateStatus = async (newStatus: any) => {
    await mutateAsync({ _id, isActive: newStatus });
  };

  return (
    <Select
      onValueChange={(e) => updateStatus(e === "true" ? true : false)}
      value=""
    >
      <SelectTrigger className="w-[130px]">
        <SelectValue placeholder={isActive ? "Aktif" : "Tidak Aktif"} />
      </SelectTrigger>
      <SelectContent>
        {!isActive ? (
          <SelectItem value="true">Aktif</SelectItem>
        ) : (
          <SelectItem value="false">Tidak Aktif</SelectItem>
        )}
      </SelectContent>
    </Select>
  );
};

export const columns: ColumnDef<BannerColumn>[] = [
  {
    accessorKey: "title",
    header: "Judul"
  },
  {
    accessorKey: "description",
    header: "Deskripsi"
  },
  {
    accessorKey: "image_desktop",
    header: "Banner Desktop",
    cell: ({ row }) => (
      <Image
        src={row.original.image_desktop}
        alt="banner"
        width={400}
        height={400}
        objectFit="cover"
      />
    )
  },
  {
    accessorKey: "image_mobile",
    header: "Banner Mobile",
    cell: ({ row }) => (
      <Image
        src={row.original.image_mobile}
        alt="banner"
        width={400}
        height={400}
        objectFit="cover"
      />
    )
  },

  {
    accessorKey: "ctaUrl",
    header: "Link Tujuan"
  },
  {
    accessorKey: "ctaCount",
    header: "Total Klik Banner"
  },
  {
    accessorKey: "viewCount",
    header: "Total Banner Dilihat"
  },

  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => (
      <StatusSelect
        isActive={row.original.isActive}
        _id={row.original._id}
      />
    )
  },

  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
