'use strict';

import { create } from 'express-handlebars';
import express from 'express';
import routes from './routes.js'; 
import logger from "./utils/logger.js";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";

const app = express();
const port = 3000;

const handlebars = create({
  extname: '.hbs',
  helpers: {
    uppercase: (inputString) => {
        return inputString.toUpperCase();
    },
    capitalise:(books) => {
      return books.replace(/(^\w{1})|(\s+\w{1})/g, letter =>
      letter.toUpperCase());
    },
    formatDate: (date) => {
    let dateCreated = new Date(date);
    let options = {weekday: "long", year: "numeric", month: "long", day: "2-digit"};       
    return `${dateCreated.toLocaleDateString("en-IE",options)}`;
},
}
});

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false, }));

app.engine(".hbs", handlebars.engine);
app.set("view engine", ".hbs")

app.use("/", routes);
app.use(fileUpload({useTempFiles: true}));

app.listen(port, () => logger.info("Your app is listening on port " + port));

