'use client';

import { ColumnDef } from '@tanstack/react-table';

import { CellAction } from './cell-action';

export type UserColumn = {
  _id?: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  roles: string;
  createdAt: string;
};

export const columns: ColumnDef<UserColumn>[] = [
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'fullName',
    header: 'Nama Lengkap',
  },
  {
    accessorKey: 'phoneNumber',
    header: 'No. Telepon',
  },
  {
    accessorKey: 'roles',
    header: 'Jenis Akun',
  },
  {
    accessorKey: 'createdAt',
    header: 'Dibuat Tanggal',
    cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
