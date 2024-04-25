'use strict';

import logger from "../utils/logger.js";
import booklistStore from "../models/mycollection.js";
import { v4 as uuidv4 } from 'uuid';
import accounts from './accounts.js';

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
  addBooklist(request, response) {
    const newBookList = {
      id: uuidv4(),
      category: request.body.category,
      books: [],
    };
    booklistStore.addBooklist(newBookList);
    response.redirect('/dashboard');
},
  deleteBooklist(request, response) {
    const booklistId = request.params.id;
    logger.debug(`Deleting Booklist ${booklistId}`);
    booklistStore.removeBooklist(booklistId);
    response.redirect("/dashboard");
},
  updateBooklist(request, response) {
    const booklistId = request.params.id;
    logger.debug("updating song " + booklistId);
    const updatedBooklist = {
      id: booklistId,
      category: request.body.category
    };
    booklistStore.editBooklist(booklistId,updatedBooklist);
    response.redirect('/dashboard/');
},
};

export default dashboard;                    // Exporting the 'dashboard' object for external usage
