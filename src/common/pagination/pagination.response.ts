interface DataItem {
  [key: string]: any;
}

export class PaginationResponse<T extends DataItem> {
  readonly data: T[];
  readonly page: number;
  readonly size: number;
  readonly totalCount: number;
  readonly totalPages: number;
  readonly hasPreviousPage: boolean;
  readonly hasNextPage: boolean;

  constructor(
    data: T[],
    page: number,
    size: number,
    totalCount: number,
  ) {
    this.data = data;
    this.page = page;
    this.size = size;
    this.totalCount = totalCount;
    this.totalPages = Math.ceil(totalCount / size) || 1;
    this.hasPreviousPage = page > 1;
    this.hasNextPage = page < this.totalPages;
  }

  toString(): string {
    return `
      PaginationResponse {
        data: ${JSON.stringify(this.data)},
        page: ${this.page},
        size: ${this.size},
        totalCount: ${this.totalCount},
        totalPages: ${this.totalPages},
        hasPreviousPage: ${this.hasPreviousPage},
        hasNextPage: ${this.hasNextPage}
      }
    `;
  }
}
