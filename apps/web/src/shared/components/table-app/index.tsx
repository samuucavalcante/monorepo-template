"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  type SortingState,
  getSortedRowModel,
  TableMeta,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import { Button } from "@/shared/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/shared/components/ui/pagination";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { cn } from "@/shared/lib/utils";
import TableAppFilter, {
  IFilterTable,
} from "@/shared/components/table-app/filters/table-app-filters";
import { ISortOptions, ResponseApi } from "arc/shared";
import { handleResponse } from "@/shared/utils/response";

export interface TableMetaInternal {
  onRefetch?: () => void;
}

type FilterItem = { key: string; value: string };

interface TableAppProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  title?: string;
  filters?: IFilterTable<TData>[];
  fetchAction: (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    params: any
  ) => Promise<ResponseApi<{ list: TData[]; count: number }>>;
  pageSize?: number;
  enableSorting?: boolean;
}

export function TableApp<TData, TValue>({
  columns,
  fetchAction,
  filters = [],
  pageSize = 10,
  title,
  enableSorting = true,
}: TableAppProps<TData, TValue>) {
  const [data, setData] = useState<TData[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize,
  });

  const [activeFilters, setActiveFilters] = useState<FilterItem[]>([]);

  const onFilterChange = (key: string, value: string) => {
    setActiveFilters((prev) => {
      const existingIndex = prev.findIndex((f) => f.key === key);
      if (existingIndex >= 0) {
        const newFilters = [...prev];
        newFilters[existingIndex] = { key, value };
        return newFilters;
      }
      return [...prev, { key, value }];
    });
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  };

  const filtersObj = useMemo(() => {
    return activeFilters.reduce((acc, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {} as Record<string, string>);
  }, [activeFilters]);

  const fetchData = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (params?: any) => {
      setLoading(true);

      // Prepare sorting parameters
      const sortParams: Partial<ISortOptions> = {};
      if (sorting.length > 0) {
        const firstSort = sorting[0];
        sortParams.orderBy = firstSort.id;
        sortParams.sort = firstSort.desc ? "desc" : "asc";
      }

      handleResponse({
        fetch: fetchAction({
          page: pagination.pageIndex + 1,
          regsPerPage: pagination.pageSize,
          ...sortParams,
          ...filtersObj,
          ...params,
        }),
        dataFallback: { list: [], count: 0 },
      }).then((res) => {
        setData(res.list);
        setPageCount(Math.ceil(res.count / pagination.pageSize));
        setLoading(false);
        setCount(res.count);
      });
    },
    [
      fetchAction,
      filtersObj,
      pagination.pageIndex,
      pagination.pageSize,
      sorting,
    ]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const table = useReactTable({
    data,
    columns,
    pageCount,
    state: {
      pagination,
      sorting,
    },
    meta: {
      onRefetch: fetchData,
    } as TableMeta<TableMetaInternal>,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    manualPagination: true,
    manualSorting: enableSorting,
    enableSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  // Generate page numbers for pagination
  const generatePageNumbers = () => {
    const currentPage = pagination.pageIndex + 1;
    const totalPages = pageCount;
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      // Show all pages if total is 7 or less
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 4) {
        pages.push("...");
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 3) {
        pages.push("...");
      }

      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const goToPage = (page: number) => {
    setPagination((prev) => ({
      ...prev,
      pageIndex: page - 1,
    }));
  };

  const changePageSize = (newPageSize: string) => {
    setPagination(() => ({
      pageIndex: 0, // Reset to first page
      pageSize: Number.parseInt(newPageSize),
    }));
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getSortIcon = (column: any) => {
    const sortDirection = column.getIsSorted();

    if (!sortDirection) {
      return <ArrowUpDown className="ml-2 h-4 w-4" />;
    }

    return sortDirection === "desc" ? (
      <ArrowDown className="ml-2 h-4 w-4" />
    ) : (
      <ArrowUp className="ml-2 h-4 w-4" />
    );
  };

  return (
    <div className="space-y-4">
      <div>{title && <h1 className="text-2xl font-bold">{title}</h1>}</div>

      <div className="flex justify-end items-center">
        <TableAppFilter
          onChange={(key, value) => onFilterChange(key, value)}
          filters={filters}
        />
      </div>

      <div className="relative overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : (
                      <div
                        className={cn(
                          "flex items-center",
                          header.column.getCanSort() && enableSorting
                            ? "cursor-pointer select-none hover:bg-accent hover:text-accent-foreground rounded-md px-2 py-1 -mx-2 -my-1"
                            : ""
                        )}
                        onClick={
                          header.column.getCanSort() && enableSorting
                            ? header.column.getToggleSortingHandler()
                            : undefined
                        }
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {header.column.getCanSort() && enableSorting && (
                          <span className="ml-2">
                            {getSortIcon(header.column)}
                          </span>
                        )}
                      </div>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  Nenhum resultado encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {loading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/70 bg-opacity-30">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        )}
      </div>

      {/* Pagination Section */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
        {/* Results info and page size selector */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div>
            Mostrando{" "}
            {Math.min(pagination.pageIndex * pagination.pageSize + 1, count)} a{" "}
            {Math.min((pagination.pageIndex + 1) * pagination.pageSize, count)}{" "}
            de {count} registros
          </div>
          <div className="flex items-center gap-2">
            <span>Registros por página:</span>
            <Select
              value={pagination.pageSize.toString()}
              onValueChange={changePageSize}
            >
              <SelectTrigger className="w-16 h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Pagination Controls */}
        {pageCount > 1 && (
          <div className="flex items-center gap-2">
            {/* First and Previous buttons */}
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => goToPage(1)}
                disabled={pagination.pageIndex === 0}
                className="h-8 w-8 p-0"
              >
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="h-8 w-8 p-0"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </div>

            {/* Page numbers */}
            <Pagination>
              <PaginationContent>
                {generatePageNumbers().map((page, index) => (
                  <PaginationItem key={index}>
                    {page === "..." ? (
                      <PaginationEllipsis />
                    ) : (
                      <PaginationLink
                        onClick={() => goToPage(page as number)}
                        isActive={pagination.pageIndex + 1 === page}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    )}
                  </PaginationItem>
                ))}
              </PaginationContent>
            </Pagination>

            {/* Next and Last buttons */}
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="h-8 w-8 p-0"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => goToPage(pageCount)}
                disabled={pagination.pageIndex === pageCount - 1}
                className="h-8 w-8 p-0"
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
