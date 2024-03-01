'use strict';

import logger from "../utils/logger.js";

const collection = {
  createView(request, response) {
    logger.info("Dashboard page loading!");
    
    const viewData = {
      title: "Booklist App Dashboard"
    };
    
    response.render('dashboard', viewData);
  },
};

export default dashboard;