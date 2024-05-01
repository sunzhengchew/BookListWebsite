'use strict';

import logger from '../utils/logger.js';
import booklistStore from '../models/mycollection.js';
import { v4 as uuidv4 } from 'uuid';
import accounts from './accounts.js';

const booklist = {                         // Creating an object named 'booklist' which contains a method 'createView'
  createView(request, response) {         // Method to handle rendering the 'booklist' view
    const booklistId = request.params.id;
    const loggedInUser = accounts.getCurrentUser(request);
    logger.debug('Booklist id = ' + booklistId);
    
    const viewData = {
      title: 'Booklist',
      singleBooklist: booklistStore.getBooklist(booklistId), // Fetching booklist data from 'booklistStore' based on id
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
  };

    response.render('booklist', viewData); 
  },
  addBook(request, response) {
    const booklistId = request.params.id;
    const booklist = booklistStore.getBooklist(booklistId);
            const newBook = {
                id: uuidv4(),
                name: request.body.name,
                author: request.body.author,
                genre: request.body.genre,
                publicYear: request.body.publicYear,
                image: request.files.image, 
            };

            booklistStore.addBook(booklistId, newBook, function(){
                response.redirect('/booklist/' + booklistId);
            });
},        
  deleteBook(request, response) {
    const booklistId = request.params.id;
    const bookId = request.params.bookid;
    logger.debug(`Deleting Book  $(bookId} from Booklist ${booklistId}`);
    booklistStore.removeBook(booklistId, bookId);
    response.redirect('/booklist/' + booklistId);
},
  updateBook(request, response) {
    const booklistId = request.params.id;
    const bookId = request.params.bookid;
    logger.debug("updating book " + bookId);
    const updatedBook = {
      id: bookId,
      name: request.body.name,
      author: request.body.author,
      genre: request.body.genre,
      publicYear: request.body.publicYear,
      image: request.files.image
    };
    booklistStore.editBook(booklistId,bookId, updatedBook,function(){
    response.redirect('/booklist/' + booklistId);
 });
},
}
export default booklist; // Exporting the 'booklist' object