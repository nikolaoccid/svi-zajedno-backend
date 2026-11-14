import { Pagination } from './pagination';

const items = Array.from({ length: 25 }, (_, i) => i + 1);

describe('Pagination', () => {
  it('returns the requested page and its meta', () => {
    const { items: page, meta } = new Pagination(items, {
      page: 2,
      limit: 10,
    }).getPage();

    expect(page).toEqual([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
    expect(meta).toEqual({
      currentPage: 2,
      itemCount: 10,
      itemsPerPage: 10,
      totalItems: 25,
      totalPages: 3,
    });
  });

  it('returns a shorter last page', () => {
    const { items: page, meta } = new Pagination(items, {
      page: 3,
      limit: 10,
    }).getPage();

    expect(page).toEqual([21, 22, 23, 24, 25]);
    expect(meta.itemCount).toBe(5);
  });

  it('clamps a page past the end to the last page', () => {
    const { items: page, meta } = new Pagination(items, {
      page: 99,
      limit: 10,
    }).getPage();

    expect(meta.currentPage).toBe(3);
    expect(page).toEqual([21, 22, 23, 24, 25]);
  });

  it('clamps page 0 or below to the first page', () => {
    const { meta } = new Pagination(items, { page: 0, limit: 10 }).getPage();

    expect(meta.currentPage).toBe(1);
  });

  it('accepts page and limit as strings, as they arrive in a query string', () => {
    const { items: page, meta } = new Pagination(items, {
      page: '2',
      limit: '5',
    }).getPage();

    expect(page).toEqual([6, 7, 8, 9, 10]);
    expect(meta.totalPages).toBe(5);
  });

  it('returns no items for an empty list', () => {
    const { items: page, meta } = new Pagination([], {
      page: 1,
      limit: 10,
    }).getPage();

    expect(page).toEqual([]);
    expect(meta.totalItems).toBe(0);
  });
});
