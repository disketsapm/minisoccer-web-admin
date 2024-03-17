"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "dateStart",
    header: "Tanggal Mulai",
    cell: ({ row }) => new Date(row.original.dateStart).toLocaleDateString()
  },

  {
    accessorKey: "dateEnd",
    header: "Tanggal Selesai",
    cell: ({ row }) => new Date(row.original.dateEnd).toLocaleDateString()
  },
  {
    accessorKey: "status",
    header: "Status"
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
