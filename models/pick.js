'use strict';

import logger from '../utils/logger.js';
import JsonStore from './json-store.js';

const recommend = {

  store: new JsonStore('./models/mycollection.json', { bookListsCollection: [] }),
  collection: 'recommendCollection',
  array: 'books',

  getAllBooklists() {
    return this.store.findAll(this.collection);
  },
  getBooklist(id) {
    return this.store.findOneBy(this.collection, (booklist => booklist.id === id));
},

};

export default recommend;