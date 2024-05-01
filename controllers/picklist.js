"use strict";

import logger from "../utils/logger.js";
import mypick from "../models/pick.js";
import { v4 as uuidv4 } from "uuid";

const picklist = {
  // Creating an object named 'picklist' which contains methods 'createView'
  createView(request, response) {
    const picklistId = request.params.id;
    logger.debug("Picklist id = " + picklistId);

    const viewData = {
      title: "Picklist",
      singlePicklist: mypick.getPicklist(picklistId), // Retrieving a specific picklist using the provided picklistId
    };

    response.render("picklist", viewData); // Rendering the 'picklist' view with the specified data
  },
  addPick(request, response) {
    const picklistId = request.params.id;
    const picklist = mypick.getPicklist(picklistId);
    const newPick = {
      id: uuidv4(),
      author: request.body.author,
      genre: request.body.genre,
      publicYear: request.body.publicYear,
      image: request.files.image,
      background:request.files.background,
    };
    mypick.addPick(picklistId, newPick, function () {
      response.redirect("/picklist/" + picklistId);
    });
  },
  deletePick(request, response) {
    const picklistId = request.params.id;
    const pickId = request.params.pickid;
    logger.debug(`Deleting Pick  $(pickId} from Booklist ${picklistId}`);
    mypick.removePick(picklistId, pickId);
    response.redirect('/picklist/' + picklistId);
},
  updatePick(request, response) {
    const picklistId = request.params.id;
    const pickId = request.params.bookid;
    logger.debug("updating pick " + pickId);
    const updatedPick = {
      id: pickId,
      author: request.body.author,
      genre: request.body.genre,
      publicYear: request.body.publicYear,
      descript:request.body.descript,
      image: request.files.image,
      background:request.files.background,
    };
    mypick.editPick(picklistId,pickId, updatedPick,function(){
    response.redirect('/picklist/' + picklistId);
 });
},
};
export default picklist; // Exporting the 'picklist' object
