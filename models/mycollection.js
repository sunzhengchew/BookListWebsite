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
  addBooklist(id, books) {
    this.store.addItem(this.collection, id, this.array, books);
},

};

export default booklistStore;