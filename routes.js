'use strict';
import logger from "./utils/logger.js";
import express from 'express';
const router = express.Router();

import about from './controllers/about.js';


router.get('/', about.createView);



export default router;