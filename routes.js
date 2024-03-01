'use strict';
import logger from "./utils/logger.js";
import express from 'express';
const router = express.Router();

import start from './controllers/about.js';
import dashboard from './controllers/about.js';
import about from './controllers/about.js';
import booklist from './controllers/about.js';


router.get('/about', about.createView);



export default router;