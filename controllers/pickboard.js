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
  deletePicklist(request, response) {
    const picklistId = request.params.id;
    logger.debug(`Deleting Playlist ${picklistId}`);
    mypick.removePicklist(picklistId);
    response.redirect("/pickboard");
},
  updatePicklist(request, response) {
    const picklistId = request.params.id;
    const picklist = mypick.getPicklist(picklistId);

    logger.debug("updating song " + picklistId);
    const updatedPicklist = {
      id: picklistId,
      bookName: request.body.bookName,
      details:picklist.details
    };
    mypick.editPicklist(picklistId,updatedPicklist);
    response.redirect('/pickboard');
},
};

export default pickboard;                  // Exporting the 'pickboard' object for external usage