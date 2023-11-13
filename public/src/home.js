function getTotalBooksCount(books) {
  return books.reduce((acc, book) => acc + 1, 0);
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  const borrowed = books.filter((book) => {
    return book.borrows.some((borrow) => borrow.returned === false);
  });
  return borrowed.length;
}

function getMostCommonGenres(books) {
  let genreCounts = {};
  books.forEach((book) => {
    if (genreCounts.hasOwnProperty(book.genre)) {
      genreCounts[book.genre] += 1;
    } else {
      genreCounts[book.genre] = 1;
    }
  });
  const result = Object.keys(genreCounts).map((genre) => ({
    name: genre,
    count: genreCounts[genre],
  }));
  result.sort((genreA, genreB) => genreB.count - genreA.count);
  return result.slice(0, 5);
}

function getMostPopularBooks(books) {
  books.sort((a, b) => b.borrows.length - a.borrows.length);
  const popBooks = books.map((book) => ({
    name: book.title,
    count: book.borrows.length,
  }));
  return popBooks.slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  const authorCount = {};

  authors.forEach((auth) => {
    authorCount[`${auth.name.first} ${auth.name.last}`] = 0;
  });

  books.forEach((book) => {
    const { authorId, borrows } = book;
    const authorName = authors.find((author) => author.id === authorId).name;
    const authorFullName = `${authorName.first} ${authorName.last}`;
    authorCount[authorFullName] += borrows.length;
  });

  const result = Object.keys(authorCount).map((auth) => ({
    name: auth,
    count: authorCount[auth],
  }));
  result.sort((a, b) => b.count - a.count);
  return result.slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
