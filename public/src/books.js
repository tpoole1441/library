function findAuthorById(authors, id) {
  const author = authors.find((author) => author.id === id);
  return author;
}

function findBookById(books, id) {
  const book = books.find((book) => book.id === id);
  return book;
}

function partitionBooksByBorrowedStatus(books) {
  const borrowed = books.filter((book) =>
    book.borrows.some((borrow) => borrow.returned === false)
  );
  const returned = books.filter((book) =>
    book.borrows.every((borrow) => borrow.returned === true)
  );
  return [borrowed, returned];
}

function getBorrowersForBook(book, accounts) {
  const bookBorrows = book.borrows;
  const borrowers = bookBorrows.map((borrow) => {
    const account = accounts.find((acc) => acc.id === borrow.id);
    return {
      ...account,
      returned: borrow.returned,
    };
  });
  return borrowers.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
