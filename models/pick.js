'use strict';

import logger from '../utils/logger.js';
import JsonStore from './json-store.js';

const mypick = {

  store: new JsonStore('./models/pick.json', { pickBook: [] }),
  collection: 'pickBookCollection',
  array: 'details',

  getAllPicklists() {
    return this.store.findAll(this.collection);
  },
  getPicklist(id) {
    return this.store.findOneBy(this.collection, (picklist => picklist.id === id));
},

};

export default mypick;