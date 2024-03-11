'use client';

import { ColumnDef } from '@tanstack/react-table';

import { CellAction } from './cell-action';
import { Banner } from '@/interfaces/banner.interface';
import Image from 'next/image';

export type BannerColumn = Banner;

export const columns: ColumnDef<BannerColumn>[] = [
  {
    accessorKey: 'image_desktop',
    header: 'Banner Desktop',
    cell: ({ row }) => (
      <Image
        src={row.original.image_desktop}
        alt="banner"
        width={400}
        height={400}
        objectFit="cover"
      />
    ),
  },

  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
