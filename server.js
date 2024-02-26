'use strict';

import express from 'express';

const app = express();
const port = 3000;

app.get('/homepage', (request, response) => response.send('Booklist App Homepage'));
app.get('/dashboard', (request, response) => response.send('Booklist App Dashboard'));
app.get('/', (request, response) => response.send('Welcome to the Booklist app!'));

app.listen(port, () => console.log(`Express app running on port ${port}!`));