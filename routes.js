'use strict';
import logger from "./utils/logger.js";
import express from 'express';
const router = express.Router();

import start from './controllers/start.js';
import dashboard from './controllers/dashboard.js';
import about from './controllers/about.js';
import booklist from './controllers/booklist.js';

router.get('/', start.createView);
router.get('/dashboard', dashboard.createView);
router.get('/about', about.createView);
router.get('/error', (request, response) => response.status(404).end('Page not found.'));
router.get('/booklist/:id', booklist.createView);



export default router;