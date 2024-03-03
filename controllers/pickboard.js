'use strict';

import logger from "../utils/logger.js";
import mypick from "../models/pick.js";

const pickboard = {
  createView(request, response) {
    logger.info("Picklist page loading!");
    
    const viewData = {
      title: "Picklist of Book",
      picklists: mypick.getAllPicklists()
    };
    
    logger.debug(viewData.pickBookCollection);
    
    response.render('pickboard', viewData);
  },
};

export default pickboard;