"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";
import { ImageField } from "@/interfaces/image-field.interface";
import Image from "next/image";

export type ImageFieldColumn = ImageField;

export const columns: ColumnDef<ImageFieldColumn>[] = [
  {
    accessorKey: "assets",
    header: "Gambar Lapang",
    cell: ({ row }) => (
      <Image
        // @ts-ignore
        src={row.original.url}
        alt="imageField"
        width={200}
        height={200}
        objectFit="cover"
      />
    )
  },

  {
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => {
      return (
        <div className="flex">
          <CellAction data={row.original} />
        </div>
      );
    }
  }
];
