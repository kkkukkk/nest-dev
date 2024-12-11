import { PaginationResponse } from '#common/pagination/PaginationResponse';

export class PaginationBuilder<T> {
  _data: T[];
  _page: number;
  _size: number;
  _sort: string;
  _sortObj: object;
  _totalCount: number;

  setData(data: T[]) {
    this._data = data;
    return this;
  }

  setPage(page: number) {
    this._page = page;
    return this;
  }

  setSize(size: number) {
    this._size = size;
    return this;
  }

  setSort(sort: string) {
    this._sort = sort;
    return this;
  }

  sortObject(sortObj: object) {
    this._sortObj = sortObj;
    return this;
  }

  setTotalCount(totalCount: number) {
    this._totalCount = totalCount;
    return this;
  }

  build() {
    return new PaginationResponse(this);
  }
}
