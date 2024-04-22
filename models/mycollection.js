'use strict';

import logger from '../utils/logger.js';
import JsonStore from './json-store.js';

const booklistStore = {

  store: new JsonStore('./models/mycollection.json', { bookListsCollection: [] }),
  collection: 'bookListsCollection',
  array: 'books',

  getAllBooklists() {
    return this.store.findAll(this.collection);
  },
  getBooklist(id) {
    return this.store.findOneBy(this.collection, (booklist => booklist.id === id));
},
 addBook(id, book) {
    this.store.addItem(this.collection, id, this.array, book);
},
  addBooklist(booklist) {
    this.store.addCollection(this.collection, booklist);
},
};

export default booklistStore;