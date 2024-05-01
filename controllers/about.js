'use strict';
import logger from "../utils/logger.js";
import creator from "../models/info.js";
import accounts from './accounts.js';


const about = {                          // Creating an object named 'about' which contains a method 'createView'
  
  createView(request, response) {        // Method to handle rendering the 'about' view
    const info = creator.getAppInfo();   // Fetching application information using the creator object
    logger.debug(info);                  // Logging the application information to the console
    const loggedInUser = accounts.getCurrentUser(request);
    const viewData = {                   // Setting up data to be passed to the view
      title: "Welcome to the Playlist app!", 
      info: creator.getAppInfo(),         // Using creator to get app information
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
    };
    
    logger.info("About page loading!")   // Logging an informational message about the about page loading
    response.render('about', viewData);  // Rendering the 'about' view with the provided data
  },
};

export default about;                    // Exporting the 'about' object for external usage
