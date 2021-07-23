// const bookShelf = require('./bookshelf');
const {nanoid} = require('nanoid');

const addBookHandler = (request, h) => {
  // const {
  // name,
  // year,
  // author,
  // summary,
  // publisher,
  // pageCount,
  // readPage,
  // reading,
  // } = request.payload;

  // console.log(request.payload);
  return request.payload;

  const id = nanoid(8);
  // const finished = readPage === pageCount ? true : false;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
};

module.exports = {addBookHandler};
