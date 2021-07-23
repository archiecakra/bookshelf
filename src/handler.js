const bookShelf = require('./bookshelf');
const {nanoid} = require('nanoid');

const addBookHandler = (request, h) => {
  const {
    name,
    // year,
    // author,
    // summary,
    // publisher,
    pageCount,
    readPage,
    // reading,
  } = request.payload;

  // console.log(request.payload);
  // return request.payload;

  const id = nanoid(8);
  const finished = readPage === pageCount ? true : false;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBook = {
    name, pageCount, readPage, id, finished, insertedAt, updatedAt,
  };

  bookShelf.push(newBook);

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

module.exports = {addBookHandler};
