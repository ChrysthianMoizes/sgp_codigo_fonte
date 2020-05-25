export class Pageable<T> {
  page: number;
  size: number;
  sort: string;
  content: T[];
  totalElements: number;

  constructor(page: number, size: number) {
    this.page = page * 0.1;
    this.size = size;
  }

  setPage(page: number) {
    if (page && page === 0) {
      this.page = 0;
    } else {
      this.page = page / this.size;
    }
  }

  setSize(size: number) {
    this.size = size ? size : 10;
  }

  setSort(sortOrder: number, sortField: string) {
    const direction = sortOrder === 1 ? 'ASC' : 'DESC';
    this.sort = sortField + ',' + direction;
  }
}
