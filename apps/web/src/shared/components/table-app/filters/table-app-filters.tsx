import { tableFiltersComponents } from "@/shared/components/table-app/filters/constants";

export type IFilterTable<T = unknown> = {
  type: "search";
  placeholder: string;
  label: string;
  queryKey: keyof T;
};

type TableAppFilterProps<T> = {
  filters: IFilterTable<T>[];
  onChange: (key: string, value: string) => void;
};
export default function TableAppFilter<T>({
  filters,
  onChange,
}: TableAppFilterProps<T>) {
  return filters.map((filter) => {
    const Component = tableFiltersComponents[filter.type];

    return (
      <Component
        key={filter.label}
        onChange={onChange}
        filter={filter as IFilterTable}
      />
    );
  });
}
