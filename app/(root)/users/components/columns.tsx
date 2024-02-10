'use client';

import { ColumnDef } from '@tanstack/react-table';

import { CellAction } from './cell-action';

export type UserColumn = {
  _id?: number;
  username: string;
  fullname: string;
  phone: string;
  roles: string;
  createdAt: string;
};

export const columns: ColumnDef<UserColumn>[] = [
  {
    accessorKey: 'username',
    header: 'Username',
  },
  {
    accessorKey: 'fullname',
    header: 'Fullname',
  },
  {
    accessorKey: 'phone',
    header: 'Phone Number',
  },
  {
    accessorKey: 'roles',
    header: 'Roles',
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
