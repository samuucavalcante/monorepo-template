"use client";

import { IFilterTable } from "@/shared/components/table-app/filters/table-app-filters";
import { Input } from "@/shared/components/ui/input";
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

  const onChangeValue = useCallback(
    (value: string) => {
      setSearchTerm(value);
      onChange(filter.queryKey.toString(), value);
    },
    [filter.queryKey, onChange]
  );

  return (
    <div className="relative w-full max-w-md">
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        size={16}
      />
      <Input
        type="search"
        placeholder={filter.placeholder || "Buscar..."}
        value={searchTerm}
        onChange={(e) => onChangeValue(e.target.value)}
        className="pl-9"
        aria-label="Search"
        spellCheck={false}
        autoComplete="off"
      />
    </div>
  );
}
