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
        width={400}
        height={400}
        objectFit="cover"
      />
    )
  },

  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
