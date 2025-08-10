import TableAppFilterSearch from "@/shared/components/table-app/filters/table-app-filter-search";
import { IFilterTable } from "@/shared/components/table-app/filters/table-app-filters";

export const tableFiltersComponents: Record<
  IFilterTable["type"],
  React.ElementType<{
    filter: IFilterTable;
    onChange: (key: string, value: string) => void;
  }>
> = {
  search: TableAppFilterSearch,
};
