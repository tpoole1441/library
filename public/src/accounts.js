function findAccountById(accounts, id) {
  const result = accounts.find((account) => account.id === id);
  return result;
}

function sortAccountsByLastName(accounts) {
  const result = accounts.sort((nameA, nameB) =>
    nameA.name.last.toLowerCase() > nameB.name.last.toLowerCase() ? 1 : -1
  );
  return result;
}

function getTotalNumberOfBorrows(account, books) {
  let borrows = 0;
  books.forEach((book) =>
    book.borrows.forEach((id) => {
      if (id.id === account.id) {
        borrows += 1;
      }
    })
  );
  return borrows;
}

function getBooksPossessedByAccount(account, books, authors) {
  const accountId = account.id;
  const checkedOut = books.filter((book) => {
    const borrowed = book.borrows.some(
      (borrow) => borrow.id === accountId && !borrow.returned
    );
    return borrowed;
  });
  const bookWithAuthors = checkedOut.map((book) => {
    const author = authors.find((author) => author.id === book.authorId);
    return {
      ...book,
      author,
    };
  });

  return bookWithAuthors;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
