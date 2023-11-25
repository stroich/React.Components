export function buildQueryString(
  search: string,
  page: number,
  numberOfCard: number,
  isDetails = false
): string {
  const defaultSearch = '';
  const defaultPage = 1;
  const defaultNumberOfCard = 8;

  const searchParam = search !== defaultSearch ? `search=${search}` : '';
  const pageParam = page !== defaultPage ? `page=${page}` : '';
  const numberOfCardParam =
    numberOfCard !== defaultNumberOfCard ? `limit=${numberOfCard}` : '';

  const queryParams = [searchParam, pageParam, numberOfCardParam].filter(
    Boolean
  );
  const queryString = queryParams.length > 0 ? queryParams.join('&') : '';

  return isDetails ? queryString : `/?${queryString}`;
}
