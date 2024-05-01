'use strict';
import logger from "../utils/logger.js";
import creator from "../models/info.js";
import booklistStore from '../models/mycollection.js';
import accounts from './accounts.js';

const main = {                                // Creating an object named 'start' which contains methods 'createView'
  createView(request, response) {
    logger.info("Start page loading!");
    const booklists = booklistStore.getAllBooklists(); 
    
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
    if(booklists.length > 0){
      for (let item of booklists) { //for loop for amount of booklists
      numBooks += item.books.length;
      if(numBooks < 10){
        checkBooks = "0" + numBooks;
      }
      else{
        checkBooks = numBooks;
      }
    }
    if(numBooklists < 10){ //for loop for amount of books
        checkBooklists = "0" + numBooklists;
      }
      else{
        checkBooklists = numBooklists;
      }
    
    for (let item of booklists) {
        calc += item.books.length / booklists.length;
        avgBook = calc.toFixed(2)
    }
    
    for (let item of booklists) {
    if (item.books.length > maxBooks) {
      maxBooks = item.books.length;
      maxBooklists = item.category;
    }
  }
    for (let item of booklists) {
    if (item.books.length < maxBooks) {
      minBooks = item.books.length;
      minBooklists = item.category;
    }
  }
    
    }
    const viewData = {
      title: "Welcome to the Booklist app!",
      info: creator.getAppInfo(), // Retrieving application information using the 'getAppInfo' method from info.js
      displayNumBooklists: checkBooklists,
      displayNumBooks:checkBooks,
      displayAvgBooks: avgBook,
      displayMaxBooklists: maxBooklists,
      displayMinBooklists:minBooklists,
    };
    
    //logger.debug(viewData);
    response.render('start', viewData);   
    }
};

export default main;