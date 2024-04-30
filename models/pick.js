'use strict';

import logger from '../utils/logger.js';
import JsonStore from './json-store.js';
import cloudinary from 'cloudinary';

import { createRequire } from "module";
const require = createRequire(import.meta.url);

try {
  const env = require("../.data/.env.json");
  cloudinary.config(env.cloudinary);
}
catch(e) {
  logger.info('You must provide a Cloudinary credentials file - see README.md');
  process.exit(1);
}

const mypick = {

  store: new JsonStore('./models/pick.json', { pickBook: [] }),
  collection: 'pickBookCollection',
  array: 'details',

  getAllPicklists() {
    return this.store.findAll(this.collection);
  },
  getPicklist(id) {
    return this.store.findOneBy(
      this.collection, 
      (picklist) => picklist.id === id
    );
},
  removePicklist(id) {
    const picklist = this.getPicklist(id);
    this.store.removeCollection(this.collection, picklist);
},
  editPicklist(id,updatepicklist) {
    this.store.editCollection(this.collection, id,updatepicklist);
},
  addPicklist(picklist) {
    this.store.addCollection(this.collection, picklist);
},
  async addPick(id, pick,response) {
    function uploader(){
    return new Promise(function(resolve, reject) {  
      cloudinary.uploader.upload(pick.picture.tempFilePath,function(result,err){
        if(err){console.log(err);}
        resolve(result);
      });
    });
  }
  let result = await uploader();
  logger.info('cloudinary result', result);
  pick.picture = result.url;
    
    this.store.addItem(this.collection, id, this.array, pick);
    response();
},
};

export default mypick;