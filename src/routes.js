const {addBookHandler} = require('./handler');
const {addBookErrorHandler} = require('./errorHandler');
const Joi = require('joi');

const routes = [
  // {
  //   method: 'GET',
  //   path: '/books',
  //   handler: getAllBookHandler,
  // },
  {
    method: 'POST',
    path: '/books',
    options: {
      validate: {
        payload: Joi.object({
          name: Joi.string().required(),
          readPage: Joi.number().max(Joi.ref('pageCount')).required(),
          pageCount: Joi.number().required(),
        }),
        failAction: addBookErrorHandler,
      },
    },
    handler: addBookHandler,
  },
  // {
  //   method: 'GET',
  //   path: '/books/{bookId}',
  //   handler: getBookByIdHandler,
  // },
  // {
  //   method: 'PUT',
  //   path: '/books/{bookId}',
  //   handler: editBookHandler,
  // },
  // {
  //   method: 'DELETE',
  //   path: '/books/{bookId}',
  //   handler: deleteBookHandler,
  // },
];

module.exports = routes;
