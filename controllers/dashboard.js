'use strict';

import logger from "../utils/logger.js";
import booklistStore from "../models/mycollection.js";
import { v4 as uuidv4 } from 'uuid';

const dashboard = {                          // Creating an object named 'dashboard' which contains a method 'createView'
  createView(request, response) {
    logger.info("Dashboard page loading!");
    
    const viewData = {
      title: "Booklist App Dashboard",
      booklists: booklistStore.getAllBooklists() // Calling 'getAllBooklists' function in mycollection.js
    };
    
    logger.debug(viewData.bookListsCollection);
    
    response.render('dashboard', viewData);
  },
  addbooklist(request, response) {
    const booklistId = request.params.id;
    const booklist = booklistStore.getBooklist(booklistId);
    const newBook = {
      id: uuidv4(),
      title: request.body.title,
      category: request.body.category,
    };
    booklistStore.addbooklist(playlistId, newSong);
    response.redirect('/playlist/' + playlistId);
},
};

export default dashboard;                    // Exporting the 'dashboard' object for external usage
