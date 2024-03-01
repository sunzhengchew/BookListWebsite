'use strict';
import appStore from "../models/app-store.js";

const start = {
  createView(request, response) {
    response.send('Welcome to the Booklist app!');   
  },
};

export default start;