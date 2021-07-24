const addBookErrorHandler = async (request, h, error) => {
  console.log(error.details[0]);
  return handling(error, h);
};

const handling = (error, h) => {
  const path = error.details[0].path[0];
  const type = error.details[0].type;

  switch (path) {
    case 'name':
      if (type === 'any.required') {
        return h.response({
          status: 'fail',
          message: 'Gagal menambahkan buku. Mohon isi nama buku',
        }).code(400).takeover();
      } else {
        return h.response({
          status: 'fail',
          message: error.message,
        }).code(400).takeover();
      }
      break;
    case 'readPage':
      if (type === 'number.max') {
        return h.response({
          status: 'fail',
          // eslint-disable-next-line max-len
          message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        }).code(400).takeover();
      } else {
        return h.response({
          status: 'fail',
          message: error.message,
        }).code(400).takeover();
      }
      break;

    default:
      return h.response({
        status: 'fail',
        message: error.message,
      }).code(400).takeover();
      break;
  }
};

module.exports = {addBookErrorHandler};
