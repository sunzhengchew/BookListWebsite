'use strict';

import logger from '../utils/logger.js';

const booklist = {
  createView(request, response) {
    const viewData = {
      title: 'Playlist'
    };
    response.render('booklist', viewData);
  },
};

export default booklist;