'use client';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  VisibilityState,
  ColumnFiltersState,
} from '@tanstack/react-table';
import { useDebouncedCallback } from 'use-debounce';

import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ArrowUpDown, ChevronDown } from 'lucide-react';
import { PaginationTable } from '../shared/pagination-table';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  onPaginationChange: any;
  pageCount: number;
  pagination: any;
  onSortingChange: any;
  sorting: any;
  filter: (value: string) => void;
}

type ColumnSort = {
  id: string;
  desc: boolean;
};

type SortingState = ColumnSort[];

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading,
  onPaginationChange,
  onSortingChange,
  filter,
  pageCount,
  pagination,
  sorting,
}: DataTableProps<TData, TValue>) {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [text, setText] = useState('');
  const debounced = useDebouncedCallback(
    // function
    (value) => {
      filter(value);
    },
    // delay in ms
    1000
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
    onPaginationChange,
    onSortingChange,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      pagination,
      sorting,
      columnVisibility,
    },
    pageCount,
  });

  return (
    <div className="w-full">
      <div className="flex justify-between items-center gap-5 py-3">
        <div className="flex justify-center items-baseline gap-x-2">
          <p className="text-sm">Show</p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="ml-auto"
              >
                {table.options.state.pagination?.pageSize}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="min-w-[2rem]"
              align="start"
            >
              {[10, 20, 30].map((size) => (
                <DropdownMenuCheckboxItem
                  key={size}
                  className="capitalize"
                  checked={table.options.state.pagination?.pageSize === size}
                  onCheckedChange={() => {
                    table.setPageSize(size);
                  }}
                >
                  {size}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <p className="text-sm">Data</p>
        </div>
        <div className="flex gap-5">
          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="ml-auto"
              >
                Kolom <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide() && column.id !== 'actions')
                .map((column) => {
                  const columnName = column.id
                    .replace(/_/g, ' ')
                    .toLowerCase()
                    .replace(/(?:^|\s)\S/g, function (a) {
                      return a.toUpperCase();
                    });
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => column.toggleVisibility(!!value)}
                    >
                      {columnName}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu> */}
          <Input
            placeholder={`Cari...`}
            onChange={(e: any) => debounced(e.target.value)}
            className="max-w-sm"
          />
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                <TableHead className="cursor-pointer">
                  <div className="flex gap-2 items-center">No</div>
                </TableHead>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      {...(header.column.getCanSort() ? { onClick: header.column.getToggleSortingHandler() } : {})}
                      className="cursor-pointer"
                    >
                      <div className="flex gap-2 items-center">
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getIsSorted() === 'asc' ? <FaChevronUp /> : header.column.getIsSorted() === 'desc' ? <FaChevronDown /> : null}
                      </div>
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, rowIndex) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  <TableCell>{pagination.pageIndex * pagination.pageSize + rowIndex + 1}</TableCell>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {isLoading ? 'Fetching Data...' : 'No results.'}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end py-4">
        <PaginationTable tableLib={table} />
      </div>
    </div>
  );
}
