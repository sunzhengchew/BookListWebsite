'use strict';

import logger from '../utils/logger.js';
import booklistStore from '../models/mycollection.js';

const booklist = {
  createView(request, response) {
    const booklistId = request.params.id;
    logger.debug('Booklist id = ' + booklistId);
    
    const viewData = {
      title: 'Booklist',
      singlePlaylist: booklistStore.getBooklist(booklistId)
    };

    response.render('booklist', viewData);
  },
};

export default booklist;