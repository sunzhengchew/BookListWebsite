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
import accounts from './controllers/accounts.js';

//imports each controllers and call the function in them
router.get('/start', start.createView);
router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);
router.get('/dashboard', dashboard.createView);
router.get('/about', about.createView);
router.get('/pickboard', pickboard.createView);
router.get('/error', (request, response) => response.status(404).end('Page not found.'));
router.get('/booklist/:id', booklist.createView);
router.get('/picklist/:id', picklist.createView);
router.get('/booklist/:id/deletebook/:bookid', booklist.deleteBook);
router.get('/dashboard/deletebooklist/:id', dashboard.deleteBooklist);
router.get('/pickboard/deletepicklist/:id', pickboard.deletePicklist);
router.post('/booklist/:id/addbook', booklist.addBook);
router.post('/dashboard/addbooklist', dashboard.addBooklist);
router.post('/booklist/:id/updatebook/:bookid', booklist.updateBook);
router.post('/dashboard/updatebooklist/:id', dashboard.updateBooklist);
router.post('/picklist/updatepicklist/:id', picklist.updatePicklist);
export default router;