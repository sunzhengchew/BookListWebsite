'use strict';
import logger from "../utils/logger.js";

const pick = {
  createView(request, response) {
    logger.info("Start page loading!");
    
    const viewData = {
      title: "Welcome to the Booklist app!",
    };
    
    //logger.debug(viewData);
    response.render('start', viewData);   
  },
};

export default pick;