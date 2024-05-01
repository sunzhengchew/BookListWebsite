'use strict';

import logger from "../utils/logger.js";
import mypick from "../models/pick.js";
import { v4 as uuidv4 } from 'uuid';
import accounts from './accounts.js';

const pickboard = {                        // Creating an object named 'pickboard' which contains a method 'createView'
  createView(request, response) {
    logger.info("Picklist page loading!");
    const loggedInUser = accounts.getCurrentUser(request);
    
    const viewData = {
      title: "Picklist of Book",
      picklists: mypick.getAllPicklists(),  // Calling 'getAllPicklists' function in pick.js
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
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
  addPicklist(request, response) {
    const newPickList = {
      id: uuidv4(),
      bookName: request.body.bookName,
      details: [],
    };
    mypick.addPicklist(newPickList);
    response.redirect('/pickboard');
},
};

export default pickboard;                  // Exporting the 'pickboard' object for external usage