'use strict';
import logger from "../utils/logger.js";
import creator from "../models/info.js";

const about = {

  createView(request, response) {
    const info = creator.getAppInfo();
    logger.debug(info);
    
    const viewData = {
      title: "Welcome to the Playlist app!",
      info: creator.getAppInfo()
    };
    
    logger.info("About page loading!")
    response.render('about', viewData);   
  },
};

export default about;