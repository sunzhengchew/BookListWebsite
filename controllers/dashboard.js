'use strict';

import logger from "../utils/logger.js";
import booklistStore from "../models/mycollection.js";

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
};

export default dashboard;                    // Exporting the 'dashboard' object for external usage
