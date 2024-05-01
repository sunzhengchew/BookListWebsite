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
  async addPick(id, pick, response) {
    // function for uploading image
    async function uploadImage(image) {
        return new Promise((resolve, reject) => {
            cloudinary.uploader.upload(image.tempFilePath, function (result, err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    let imageResult = await uploadImage(pick.image);
    let backgroundResult = await uploadImage(pick.background);

    
    logger.info('cloudinary image result', imageResult);
    logger.info('cloudinary background result', backgroundResult);

    // Update pick object with image URLs
    pick.image = imageResult.url;
    pick.background = backgroundResult.url;

    this.store.addItem(this.collection, id, this.array, pick);
    response();
},
  removePick(id, pickId) {
    this.store.removeItem(this.collection, id, this.array, pickId);
},
  async editPick(id, bookId, updatedBook,response) {
      function uploader(){
    return new Promise(function(resolve, reject) {  
      cloudinary.uploader.upload(updatedBook.image.tempFilePath,function(result,err){
        if(err){console.log(err);}
        resolve(result);
      });
    });
  }
  let result = await uploader();
  logger.info('cloudinary result', result);
  updatedBook.image = result.url;


    this.store.editItem(this.collection, id, bookId, this.array, updatedBook);
    response();
},
};

export default mypick;