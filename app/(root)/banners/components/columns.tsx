"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";
import { Banner } from "@/interfaces/banner.interface";
import Image from "next/image";

export type BannerColumn = Banner;

export const columns: ColumnDef<BannerColumn>[] = [
  {
    accessorKey: "title",
    header: "Title"
  },
  {
    accessorKey: "description",
    header: "Description"
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => (
      <Image
        src={row.original.image}
        alt="banner"
        width={400}
        height={400}
        objectFit="cover"
      />
    )
  },
  {
    accessorKey: "type",
    header: "Type"
  },
  {
    accessorKey: "ctaUrl",
    header: "CTA Url"
  },
  {
    accessorKey: "ctaCount",
    header: "CTA Count"
  },
  {
    accessorKey: "viewCount",
    header: "View Count"
  },
  {
    accessorKey: "availableAt",
    header: "Available At",
    cell: ({ row }) => new Date(row.original.availableAt).toLocaleDateString()
  },
  {
    accessorKey: "availableUntil",
    header: "Available Until",
    cell: ({ row }) => new Date(row.original.availableUntil).toLocaleDateString()
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
