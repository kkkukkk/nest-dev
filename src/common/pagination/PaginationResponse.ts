import { PaginationBuilder } from './builder/pagination.builder';

interface DataItem {
  [key: string]: any;
}

export class PaginationResponse<T extends DataItem> {
  data: T[];
  page: number;
  size: number;
  sort: string;
  sortObj: object;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  constructor(paginationBuilder: PaginationBuilder<T>) {
    this.data = paginationBuilder._data;
    this.page = paginationBuilder._page;
    this.size = paginationBuilder._size;
    this.sort = paginationBuilder._sort;
    this.sortObj = paginationBuilder._sortObj;
    this.totalCount = paginationBuilder._totalCount;
    this.totalPages = this.getTotalPages(
      paginationBuilder._totalCount,
      paginationBuilder._size,
    );
    this.hasPreviousPage = this.getHasPreviousPage(paginationBuilder._page);
    this.hasNextPage = this.getHasNextPage(
      paginationBuilder._page,
      this.totalPages,
    );
  }
  private getTotalPages(totalCount: number, size: number): number {
    return Math.ceil(totalCount / size);
  }
  private getHasPreviousPage(page: number): boolean {
    return page > 1;
  }
  private getHasNextPage(page: number, totalPage: number): boolean {
    return page < totalPage;
  }

  toString(): string {
    return `PaginationResponse {
      data: ${JSON.stringify(this.data)},
      page: ${this.page},
      size: ${this.size},
      sort: ${this.sort},
      sortObj: ${Object.entries(this.sortObj)}
      totalCount: ${this.totalCount},
      totalPages: ${this.totalPages},
      hasPreviousPage: ${this.hasPreviousPage},
      hasNextPage: ${this.hasNextPage}
    }`;
  }
}
