 'use strict';
import logger from "./utils/logger.js";
import express from 'express';
const router = express.Router();

//get each controller from controller file
import start from './controllers/start.js'; 
import dashboard from './controllers/dashboard.js'; 
import about from './controllers/about.js'; 
import pickboard from './controllers/pickboard.js'; 
import booklist from './controllers/booklist.js'; 
import picklist from './controllers/picklist.js'; 

//imports each controllers and call the function in them
router.get('/', start.createView);
router.get('/dashboard', dashboard.createView);
router.get('/about', about.createView);
router.get('/pickboard', pickboard.createView);
router.get('/error', (request, response) => response.status(404).end('Page not found.'));
router.get('/booklist/:id', booklist.createView);
router.get('/picklist/:id', picklist.createView);
router.get('/booklist/:id/deletebook/:bookid', booklist.deleteBook);
router.get('/dashboard/deletebooklist/:id', dashboard.deleteBooklist);
router.post('/booklist/:id/addbook', booklist.addBook);
router.post('/dashboard/addbooklist', dashboard.addBooklist);

export default router;