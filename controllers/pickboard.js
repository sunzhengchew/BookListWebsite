'use strict';

import logger from "../utils/logger.js";
import mypick from "../models/pick.js";

const pickboard = {                        // Creating an object named 'pickboard' which contains a method 'createView'
  createView(request, response) {
    logger.info("Picklist page loading!");
    
    const viewData = {
      title: "Picklist of Book",
      picklists: mypick.getAllPicklists()  // Calling 'getAllPicklists' function in pick.js
    };
    
    logger.debug(viewData.pickBookCollection);
    
    response.render('pickboard', viewData);
  },
};

export default pickboard;                  // Exporting the 'pickboard' object for external usage