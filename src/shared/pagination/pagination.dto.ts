export class PaginationDto<T> {
  total: number;
  page: number;
  pageCount: number;
  pageSize: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  items: T[];
}
