'use strict';
import logger from "../utils/logger.js";
import creator from "../models/info.js";
import booklistStore from '../models/mycollection.js';

const start = {                                // Creating an object named 'start' which contains methods 'createView'
  createView(request, response) {
    logger.info("Start page loading!");
    const booklists = booklistStore.getAllBooklists();
    let numBooklists = booklists.length;
    
    const viewData = {
      title: "Welcome to the Booklist app!",
      info: creator.getAppInfo(), // Retrieving application information using the 'getAppInfo' method from info.js
      displayNumBooklists: numBooklists,
    };
    
    //logger.debug(viewData);
    response.render('start', viewData);   
  },
};

export default start; // Exporting the 'picklist' object 