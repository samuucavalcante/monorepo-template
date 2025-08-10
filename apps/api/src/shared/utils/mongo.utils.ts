import type { IReadListDTO, ISortOptions } from "arc/shared";

export function aggregationBuildPagination(params: IReadListDTO) {
  const { page, regsPerPage } = params;

  const pageValue = page ?? 1;
  const regsPerPageValue = regsPerPage ?? 10;

  const regsToSkip = (Number(pageValue) - 1) * Number(regsPerPageValue);

  return [{ $skip: regsToSkip }, { $limit: Number(regsPerPageValue) }];
}

export function aggregationBuildCount() {
  return [{ $count: "count" }];
}

export function aggregationBuildSortPipeline({
  orderBy = "_id",
  sort = "asc",
}: ISortOptions) {
  const sortDirection: 1 | -1 = sort === "asc" ? 1 : -1;

  return [{ $sort: { [orderBy]: sortDirection } }];
}
