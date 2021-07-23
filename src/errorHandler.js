const bookShelf = require('./bookshelf');

const handling = (path, h) => {
  switch (path) {
    case 'name':
      return h.response({
        status: 'fail',
        message: 'Gagal menambahkan buku. Mohon isi nama buku',
      }).code(400).takeover();
      break;
    case 'pageCount':
      return h.response({
        status: 'fail',
        // eslint-disable-next-line max-len
        message: 'Gagal menambahkan buku. pageCount tidak boleh lebih besar dari pageCount',
      }).code(400).takeover();
      break;
    case 'readPage':
      return h.response({
        status: 'fail',
        // eslint-disable-next-line max-len
        message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
      }).code(400).takeover();
      break;

    default:
      console.log(error);
      return h.response(error).takeover();
      break;
  }
};

const addBookErrorHandler = async (request, h, error) => {
  const path = error.details[0].path[0];
  console.log(error.details[0]);
  return handling(path, h);
};

module.exports = {addBookErrorHandler};
