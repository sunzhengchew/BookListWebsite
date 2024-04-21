'use strict';
import logger from "../utils/logger.js";
import creator from "../models/info.js";
import booklistStore from '../models/mycollection.js';

const start = {                                // Creating an object named 'start' which contains methods 'createView'
  createView(request, response) {
    logger.info("Start page loading!");
    const booklists = booklistStore.getAllBooklists(); // get details of the booklist by calling "getAllBooklists" method from mycollection.js
    let numBooklists = booklists.length; //amount of the booklist
    let checkBooklists = "";
    let numBooks = 0; //amount of the books
    let checkBooks = ""; //add a zero before statistic result if amount of books less than 10
    let calc = 0;
    let avgBook = 0;
    let maxBooks = 0;
    let minBooks = 0;
    let maxBooklists = null;
    let minBooklists = null;
    
    
    
    const viewData = {
      title: "Welcome to the Booklist app!",
      info: creator.getAppInfo(), // Retrieving application information using the 'getAppInfo' method from info.js
    };
    
    //logger.debug(viewData);
    response.render('start', viewData);   
  },
};

export default start; // Exporting the 'picklist' object 