const bookShelf = require('./bookshelf');
const {nanoid} = require('nanoid');

const addBookHandler = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  // console.log(request.payload);
  // return request.payload;

  const id = nanoid(8);
  const finished = readPage === pageCount ? true : false;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  bookShelf.push(newBook);
  console.log(newBook);

  const isSuccess = bookShelf.filter((book) => book.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  } else {
    const response = h.response({
      status: 'error',
      message: 'Buku gagal ditambahkan',
    });
    response.code(500);
    return response;
  }
};

const getAllBookHandler = (request, h) => {
  const filterKey = Object.keys(request.query);
  const filterValue = Object.values(request.query);

  const filterBookShelf = (key, value) => {
    // return [key, value];
    let books;

    switch (key) {
      case 'name':
        books = bookShelf.filter((book) => {
          return book[key].toLowerCase().includes(value.toLowerCase());
        });
        break;
      case 'reading':
      case 'finished':
        books = bookShelf.filter((book) => {
          return book[key] === Boolean(parseInt(value));
        });
        break;

      default:
        break;
    }

    return books;
  };

  const mapBookShelf = (books) => {
    return books.map((book) => {
      return {
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      };
    });
  };

  if (filterKey.length) {
    return ({
      status: 'success',
      data: {
        books: mapBookShelf(filterBookShelf(filterKey[0], filterValue[0])),
      },

    });
  } else {
    return ({
      status: 'success',
      data: {
        books: mapBookShelf(bookShelf),
      },
    });
  }
};

const getBookByIdHandler = (request, h) => {
  const {bookId} = request.params;
  const book = bookShelf.filter((book) => book.id === bookId)[0];

  if (book !== undefined) {
    return {
      status: 'success',
      data: {
        book,
      },
    };
  } else {
    const response = h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    });
    response.code(404);
    return response;
  }
};

const editBookHandler = (request, h) => {
  const {bookId} = request.params;
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const finished = readPage === pageCount ? true : false;
  const updatedAt = new Date().toISOString();
  const index = bookShelf.findIndex((book) => book.id === bookId);

  if (index !== -1) {
    bookShelf[index] = {
      ...bookShelf[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
      finished,
    };

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    response.code(200);
    return response;
  } else {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
    response.code(404);
    return response;
  }
};

module.exports = {
  addBookHandler,
  getAllBookHandler,
  getBookByIdHandler,
  editBookHandler,
};
