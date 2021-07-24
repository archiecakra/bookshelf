const {
  addBookHandler,
  getAllBookHandler,
  getBookByIdHandler,
  editBookHandler,
} = require('./handler');
const {addBookErrorHandler, editBookErrorHandler} = require('./errorHandler');
const Joi = require('joi');

const routes = [
  {
    method: 'GET',
    path: '/books',
    handler: getAllBookHandler,
  },
  {
    method: 'POST',
    path: '/books',
    options: {
      validate: {
        payload: Joi.object({
          name: Joi.string().required(),
          year: Joi.number().required(),
          author: Joi.string().required(),
          summary: Joi.string().required(),
          publisher: Joi.string().required(),
          readPage: Joi.number().max(Joi.ref('pageCount')).required(),
          pageCount: Joi.number().required(),
          reading: Joi.boolean().required(),
        }),
        failAction: addBookErrorHandler,
      },
    },
    handler: addBookHandler,
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: getBookByIdHandler,
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    options: {
      validate: {
        payload: Joi.object({
          name: Joi.string().required(),
          year: Joi.number().required(),
          author: Joi.string().required(),
          summary: Joi.string().required(),
          publisher: Joi.string().required(),
          readPage: Joi.number().max(Joi.ref('pageCount')).required(),
          pageCount: Joi.number().required(),
          reading: Joi.boolean().required(),
        }),
        failAction: editBookErrorHandler,
      },
    },
    handler: editBookHandler,
  },
  // {
  //   method: 'DELETE',
  //   path: '/books/{bookId}',
  //   handler: deleteBookHandler,
  // },
];

module.exports = routes;
