'use strict';

import logger from '../utils/logger.js';
import userStore from '../models/user-store.js';
import { v4 as uuidv4 } from 'uuid';

//create an accounts object
const accounts = {

  //index function to render index page
  index(request, response) {
    const viewData = {
      title: 'Login or Signup',
    };
    response.render('index', viewData);
  },
  
  //login function to render login page
  login(request, response) {
    const viewData = {
      title: 'Login to the Service',
    };
    response.render('login', viewData);
  },
  
  //logout function to render logout page
  logout(request, response) {
    response.cookie('booklist', '');
    response.redirect('/');
  },
  
 //signup function to render signup page
signup(request, response) {
    const viewData = {
      title: 'Login to the Service',
    };
    response.render('signup', viewData);
  },
  
 //register function to render the registration page for adding a new user
  register(request, response) {
    const userId = request.params.id;
    const user = userStore.getUserById(userId);
    const newUser={
      id = uuidv4();
  }
    userStore.addUser(user,function(){
    logger.info('registering' + user.email);
    const regis = userStore.getUserByEmail(request.body.email);
    if (regis) {
      response.cookie('booklist', regis.email);
      logger.info('logging in' + regis.email);
      response.redirect('/start');
    } else {
      response.redirect('/login');
    }})
  },
  
  //authenticate function to check user credentials and either render the login page again or the start page.
  authenticate(request, response) {
    const user = userStore.getUserByEmail(request.body.email);
    if (user && user.password === request.body.password) {
      response.cookie('booklist', user.email);
      logger.info('logging in' + user.email);
      response.redirect('/start');
    } else {
      response.redirect('/login');
    }
  },
  
 //utility function getCurrentUser to check who is currently logged in
  getCurrentUser (request) {
    const userEmail = request.cookies.booklist;
    return userStore.getUserByEmail(userEmail);
  }
}

export default accounts;