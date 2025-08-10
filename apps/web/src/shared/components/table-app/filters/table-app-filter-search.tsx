"use client";

import { IFilterTable } from "@/shared/components/table-app/filters/table-app-filters";
import { Input } from "@/shared/components/ui/input";
import { debounce } from "@/shared/utils/debounce";
import { Search } from "lucide-react";
import { useCallback, useState } from "react";

type TableAppFilterSearchProps<T> = {
  filter: IFilterTable<T>;
  onChange: (key: string, value: string) => void;
  debounceTime?: number;
};

export default function TableAppFilterSearch<T>({
  filter,
  onChange,
}: TableAppFilterSearchProps<T>) {
  const [searchTerm, setSearchTerm] = useState("");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onChangeDebounceValue = useCallback(
    debounce((value: string) => {
      onChange(filter.queryKey.toString(), value);
    }),
    [filter.queryKey, onChange]
  );

  const onChangeLocal = useCallback(
    (value: string) => {
      setSearchTerm(value);
      onChangeDebounceValue(value);
    },
    [onChangeDebounceValue]
  );

  return (
    <>
      <div className="mr-2">
        <h3 className="text-sm font-semibold text-muted-foreground">
          {filter.label}
        </h3>
      </div>
      <div className="relative w-full max-w-md">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          size={16}
        />
        <Input
          type="search"
          placeholder={filter.placeholder || "Buscar..."}
          value={searchTerm}
          onChange={(e) => onChangeLocal(e.target.value)}
          className="pl-9"
          aria-label="Search"
          spellCheck={false}
          autoComplete="off"
        />
      </div>
    </>
  );
}
