'use client';

import { ColumnDef } from '@tanstack/react-table';

import { CellAction } from './cell-action';
import { Field } from '@/interfaces/field.interface';

export type FieldColumn = Field;

export const columns: ColumnDef<FieldColumn>[] = [
  {
    accessorKey: 'yardName',
    header: 'Nama Lapang',
  },
  {
    accessorKey: 'yardDesc',
    header: 'Deskripsi Lapang',
  },
  {
    accessorKey: 'yardCapacity',
    header: 'Kapasitas Lapang',
  },
  {
    accessorKey: 'yardSize',
    header: 'Ukuran Lapang',
  },
  {
    accessorKey: 'yardFacilities',
    header: 'Fasilitas Lapang',
    cell: ({ row }) => {
      console.log(row.original.yardFacilities);
      return (
        <div className="flex flex-col">
          {row.original.yardFacilities.map((facility: any, index) => (
            <span key={index}>{facility.name}</span>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: 'yardLocationUrl',
    header: 'Lokasi Lapang',
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
