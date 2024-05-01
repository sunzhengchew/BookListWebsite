'use strict';

import logger from "../utils/logger.js";
import booklistStore from "../models/mycollection.js";
import { v4 as uuidv4 } from 'uuid';
import accounts from './accounts.js';

const dashboard = {                          // Creating an object named 'dashboard' which contains a method 'createView'
  createView(request, response) {
    logger.info("Dashboard page loading!");
    const loggedInUser = accounts.getCurrentUser(request);
    if (loggedInUser) {
    const viewData = {
      title: "Booklist App Dashboard",
      booklists: booklistStore.getUserBooklists(loggedInUser.id),
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
      picture: loggedInUser.picture, 
    };
    logger.info('about to render' + viewData.booklists);
    response.render('dashboard', viewData);
    }
    else response.redirect('/');
  },
  addBooklist(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    logger.debug(loggedInUser.id);
    const newBookList = {
      userid: loggedInUser.id,
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
    const booklist = booklistStore.getBooklist(booklistId);

    logger.debug("updating song " + booklistId);
    const updatedBooklist = {
      id: booklistId,
      category: request.body.category,
      books:booklist.books
    };
    booklistStore.editBooklist(booklistId,updatedBooklist);
    response.redirect('/dashboard/');
},
};

export default dashboard;                    // Exporting the 'dashboard' object for external usage
