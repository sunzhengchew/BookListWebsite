'use strict';
import logger from "../utils/logger.js";
import creator from "../models/info.js";

const start = {
  createView(request, response) {
    logger.info("Start page loading!");
    
    const viewData = {
      title: "Welcome to the Booklist app!",
      info: creator.getAppInfo()
    };
    
    //logger.debug(viewData);
    response.render('start', viewData);   
  },
};

export default start;