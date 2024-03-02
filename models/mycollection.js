'use strict';

import logger from '../utils/logger.js';
import JsonStore from './json-store.js';

const listStore = {

  store: new JsonStore('./models/playlist-store.json', { playlistCollection: [] }),
  collection: 'playlistCollection',
  array: 'songs',

  getAllPlaylists() {
    return this.store.findAll(this.collection);
  },

};

export default playlistStore;