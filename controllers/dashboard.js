'use strict';

import logger from "../utils/logger.js";
import booklistStore from "../models/mycollection.js";

const dashboard = {
  createView(request, response) {
    logger.info("Dashboard page loading!");
    
    const viewData = {
      title: "Booklist App Dashboard",
      booklists: booklistStore.getAllBooklists()
    };
    
    logger.debug(viewData.booklists);
    
    response.render('dashboard', viewData);
  },
};

export default dashboard;