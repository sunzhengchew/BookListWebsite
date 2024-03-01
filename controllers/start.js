'use strict';
import logger from "../utils/logger.js";
import creator from "../models/info.js";

const start = {

  createView(request, response) {
    const info = creator.getAppInfo();
    logger.debug(info);
    
    logger.info("Start page loading!")
    response.json(info);   
  },
};

export default start;