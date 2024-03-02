'use strict';

import logger from '../utils/logger.js';
import JsonStore from './json-store.js';

const booklistStore = {

  store: new JsonStore('./models/mycollection.json', { bookLists: [] }),
  collection: 'bookLists',
  array: 'books',

  getAllBooklists() {
    return this.store.findAll(this.collection);
  },

};

export default booklistStore;