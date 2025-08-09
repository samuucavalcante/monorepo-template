import type { IReadListDTO } from "arc/shared";

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
