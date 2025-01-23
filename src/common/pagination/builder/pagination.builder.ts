import { PaginationEnum } from '#common/pagination/enum/pagination.enum';
import { PaginationResponse } from '#common/pagination/pagination.response';

interface DataItem {
  [key: string]: any;
}

export class PaginationBuilder<T extends DataItem> {
  private data: T[];
  private page: number = PaginationEnum.PAGE_DEFAULT;
  private size: number = PaginationEnum.SIZE_DEFAULT;
  private totalCount: number = 0;

  setData(data: T[]) {
    this.data = data;
    return this;
  }

  setPage(page: number) {
    this.page = page;
    return this;
  }

  setSize(size: number) {
    this.size = size;
    return this;
  }

  setTotalCount(totalCount: number) {
    this.totalCount = totalCount;
    return this;
  }

  build(): PaginationResponse<T> {
    return new PaginationResponse<T>(
      this.data,
      this.page,
      this.size,
      this.totalCount,
    );
  }
}
