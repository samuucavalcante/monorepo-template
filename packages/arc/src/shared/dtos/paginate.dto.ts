export type SortOrder = "asc" | "desc";

export interface ISortOptions {
  orderBy: string;
  sort: SortOrder;
}

export interface IReadListDTO extends ISortOptions {
  page: number;
  regsPerPage: number;
}
