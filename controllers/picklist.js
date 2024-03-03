'use strict';

import logger from '../utils/logger.js';
import mypick from '../models/pick.js';

const picklist = {
  createView(request, response) {
    const picklistId = request.params.id;
    logger.debug('Picklist id = ' + picklistId);
    
    const viewData = {
      title: 'Picklist',
      singlePicklist: mypick.getPicklist(picklistId)
    };

    response.render('booklist', viewData);
  },
};

export default picklist;