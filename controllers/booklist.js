'use strict';

import logger from '../utils/logger.js';
import booklistStore from '../models/mycollection.js';

const booklist = {                         // Creating an object named 'booklist' which contains a method 'createView'
  createView(request, response) {         // Method to handle rendering the 'booklist' view
    const booklistId = request.params.id;
    logger.debug('Booklist id = ' + booklistId);
    
    const viewData = {
      title: 'Booklist',
      singleBooklist: booklistStore.getBooklist(booklistId) // Fetching booklist data from 'booklistStore' based on id
    };

    response.render('booklist', viewData); 
  },
};

export default booklist; // Exporting the 'booklist' object