export function generatePageButtons(
  currentPage: number,
  totalPages: number
): number[] {
  const pageButtons = [];
  const maxPageButtons = 5;

  if (totalPages <= maxPageButtons) {
    for (let page = 1; page <= totalPages; page++) {
      pageButtons.push(page);
    }
  } else {
    let startPage, endPage;

    if (currentPage <= 3) {
      startPage = 1;
      endPage = maxPageButtons;
    } else if (currentPage >= totalPages - 2) {
      startPage = totalPages - maxPageButtons + 1;
      endPage = totalPages;
    } else {
      startPage = currentPage - 2;
      endPage = currentPage + 2;
    }

    for (let page = startPage; page <= endPage; page++) {
      pageButtons.push(page);
    }
  }

  return pageButtons;
}
