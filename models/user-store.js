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

const userStore = {

  store: new JsonStore('./models/user-store.json', { users: [] }),
  collection: 'users',

  getAllUsers() {
    return this.store.findAll(this.collection);
  },
  
  getUserById(id) {
    return this.store.findOneBy(this.collection, (user => user.id === id));
  },
  
  getUserByEmail(email) {
    return this.store.findOneBy(this.collection, (user => user.email === email));
  },
  
  async addUser(user,response) {
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
  let imageResult = await uploadImage(user.picture);
  logger.info('cloudinary image result', imageResult);
  user.picture = imageResult.url;

  this.store.addCollection(this.collection, user);
  response();
},
};

export default userStore;