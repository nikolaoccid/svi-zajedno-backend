import { IPaginationOptions } from 'nestjs-typeorm-paginate';
export interface PaginationMeta {
  currentPage: number;
  itemCount: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

export class Pagination<T> {
  constructor(private items: T[], private options: IPaginationOptions) {}

  getPage(): { items: T[]; meta: PaginationMeta } {
    const totalCount = this.items.length;
    const limit = this.getLimit();
    const page = this.getPageNumber();

    const totalPages = Math.ceil(totalCount / limit);
    const currentPage = Math.min(totalPages, Math.max(1, page));
    const startIndex = (currentPage - 1) * limit;
    const endIndex = Math.min(startIndex + limit, totalCount);

    const items = this.items.slice(startIndex, endIndex);

    const meta: PaginationMeta = {
      currentPage,
      itemCount: items.length,
      itemsPerPage: limit,
      totalItems: totalCount,
      totalPages,
    };

    return { items, meta };
  }

  private getLimit(): number {
    return typeof this.options.limit === 'number'
      ? this.options.limit
      : parseInt(this.options.limit, 10);
  }

  private getPageNumber(): number {
    return typeof this.options.page === 'number'
      ? this.options.page
      : parseInt(this.options.page, 10);
  }
}
