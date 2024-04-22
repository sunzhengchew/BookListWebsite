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
const booklistStore = {

  store: new JsonStore('./models/mycollection.json', { bookListsCollection: [] }),
  collection: 'bookListsCollection',
  array: 'books',

  getAllBooklists() {
    return this.store.findAll(this.collection);
  },
  getBooklist(id) {
    return this.store.findOneBy(this.collection, (booklist => booklist.id === id));
},
 async addBook(id,book, response) {
  function uploader(){
    return new Promise(function(resolve, reject) {  
      cloudinary.uploader.upload(book.image.tempFilePath,function(result,err){
        if(err){console.log(err);}
        resolve(result);
      });
    });
  }
  let result = await uploader();
  logger.info('cloudinary result', result);
  book.image = result.url;

  this.store.addItem(this.collection, id,this.array,book);
  response();
},
  addBooklist(booklist) {
    this.store.addCollection(this.collection, booklist);
},
};

export default booklistStore;